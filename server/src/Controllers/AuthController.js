require('dotenv').config();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Account = require('../Models/Account');
const User = require('../Models/User');
const EmailVerification = require('../Models/VerificationToken');
const { sendEmailVerification } = require('../Helpers/SendEmail')
const { hashPassword, compareHashed } = require('../Helpers/Auth');
const { countDeclinedApplicationRequirements } = require('../Controllers/ApplicationController')

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({ error: 'Required all fields!' });
    }

    try {
        const user = await Account.findOne({ email: email });
    
        if(!user || !await compareHashed(password, user.password)) {
            return res.json({ error: 'Incorrect Email or Password.' });
        }

        const loginToken = jwt.sign({ email: email, role: user.role }, process.env.JWT_SECRET);
        /* countDeclinedApplicationRequirements() */
        return res.cookie('loginToken', loginToken, { httpOnly: true, secure: true, sameSite:'None' }).json({ message: 'Login Successfully' });

    } catch (error) {
        console.error(`Login Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const register = async (req, res) => {
    const { employeeID, email, password } = req.body;

    if(!employeeID || !email || !password) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!validator.isEmail(email)) {
        return res.json({ error: 'Email is not valid!' });
    }

    if(!validator.isStrongPassword(password)) {
        return res.json({ error: 'The Password must contain one uppercase, one lowercase, one number, one special character and with length of 8-16' });
    }

    try {
        const [ isEmailExist, hashedPassword ] = await Promise.all([
            Account.findOne({ email }),
            hashPassword( password )
        ]);
        
        if(isEmailExist) {
            return res.json({ error: 'Email already existed' });
        }

        const userAccount = await Account.create({
            employeeID,  
            email, 
            password: hashedPassword
        });

        if (userAccount) {
            sendEmailVerification(userAccount.email);
            const verificationToken = jwt.sign({ email: email, employeeID: employeeID }, process.env.JWT_SECRET);
            return res.cookie('verificationToken', verificationToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Registered' }); 
        }

        return res.json({ error: 'There is an error at the moment. Pleas try again later.'});

    } catch (error) {
        console.error(`Registration Error: ' ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const verifyEmail = async (req,res) => {
    const { verificationToken } = req.cookies;
    const { otp } = req.body;

    if(!otp) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!verificationToken) {
        return res.json({ error: 'Access denied.'});
    }

    try {
        const { email } = jwt.verify(verificationToken, process.env.JWT_SECRET);
        const userOTP = await EmailVerification.findOne({ owner: email });

        if(!userOTP) {
            return res.json({ error: 'Please resend your One-Time-Pin' });
        }

        const isOTPCorrect = await compareHashed(otp, userOTP.Otp);

        if(!isOTPCorrect) {
            return res.json({ error: 'Incorrect One-Time-Pin!' });
        }

        await EmailVerification.deleteOne({ owner: email })
        return res.json({ success: true, message: 'OTP verified successfully.' });

    } catch (error) {
        console.error(`Email Verification Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const registerProfile = async (req, res) => {
    const { verificationToken } = req.cookies;
    const {  firstName, lastName, middleName, track, rank, position, department } = req.body;

    if(!firstName || !lastName || !track || !rank || !position || !department) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!verificationToken) {
        return res.json({ error: 'Access denied!' });
    }

    try {
        const decode = jwt.verify(verificationToken, process.env.JWT_SECRET);

        const userData = await User.create({
            employeeID: decode.employeeID,
            email: decode.email,
            firstName,
            lastName,
            middleName,
            track,
            rank,
            position,
            department,
        });

        if(userData) {
            res.clearCookie('verificationToken', { path: '/home', sameSite: 'None', secure: true });
            const userAccount = await Account.findOne({ email: decode.email });
            const loginToken = jwt.sign({ email: userAccount.email, role: userAccount.role }, process.env.JWT_SECRET);
            console.log(`${Date.now() - start}`)
            return res.cookie('loginToken', loginToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ user: userData, role: userAccount.role });
        }

        return res.json({ error: 'There is a problem at the moment please try again later' });
        
    } catch (error) {
        console.error(`Profile Registration Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.json({ error: 'Please enter your email' });
    }

    try {
        const user = await Account.findOne({ email: email })
        
        if(!user) {
            return res.json({ error: "Email doesn't exist!" });
        }
        
        sendEmailVerification(email);
        const verificationToken = jwt.sign({ email: email }, process.env.JWT_SECRET);
        return res.cookie('verificationToken', verificationToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ email: email });
    
    } catch (error) {
        console.error(`Forgot Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const resetPassword = async (req, res) => {
    const { password , confirmPassword } = req.body
    const { verificationToken } = req.cookies;

    if(!password || !confirmPassword) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!validator.isStrongPassword(password)) {
        return res.json({ error: 'The Password must contain one uppercase, one lowercase, one number, one special character and with length of 8-16' });
    }

   
    try {
        const { email } = jwt.verify(verificationToken, process.env.JWT_SECRET);

        const hashedPassword = await hashPassword(password);

        await Account.updateOne({ email: email }, { password: hashedPassword });

        res.clearCookie('verificationToken', { path: '/', sameSite: 'none', secure: true });

        return res.json({ success: true, message: 'Changed Password Successfully' });

    } catch (error) {
        console.error(`Reset Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const resendOTP = (req, res) => {
    const { verificationToken } = req.cookies;

    if(!verificationToken) {
        return res.json({ error: 'Access denied!' });
    }

    try {
        const { email } = jwt.verify(verificationToken, process.env.JWT_SECRET);
        sendEmailVerification(email);

        return res.json('Successfully resend your one time pin');
        
    } catch (error) {
        console.error(`Resend One Time Pin Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });;
    }
}

const logout = (req, res) => {
    res.clearCookie('loginToken', { path: '/', sameSite: 'none', secure: true });
    return res.json({ message: 'Succesfully Logged Out' })
}

module.exports = {
    login,
    register,
    verifyEmail,
    registerProfile,
    forgotPassword,
    resetPassword, 
    logout,
    resendOTP,
}