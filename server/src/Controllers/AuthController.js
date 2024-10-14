import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import validator from 'validator';
import Account from '../Models/Account.js';
import User from '../Models/User.js';
import EmailVerification from '../Models/VerificationToken.js';
import sendEmailVerification from '../Helpers/SendEmail.js';
import { hashPassword, compareHashed } from '../Helpers/Auth.js';
import { uploadImageToCloudinary } from '../Helpers/Cloudinary.js'

export const login = async (req, res) => {
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
        return res.cookie('loginToken', loginToken, { httpOnly: true, secure: true, sameSite:'None' }).json({ message: 'Login Successfully' });

    } catch (error) {
        console.error(`Login Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const register = async (req, res) => {
    const { employeeID, email, password, role } = req.body;

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

        var userRole = ''
        if(!role) {
            userRole = 'user'
        }
        else {
            userRole = role
        }
 
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
            const verificationToken = jwt.sign({ email: email, employeeID: employeeID, role: userRole }, process.env.JWT_SECRET);
            return res.cookie('verificationToken', verificationToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Registered' }); 
        }

        return res.json({ error: 'There is an error at the moment. Pleas try again later.'});

    } catch (error) {
        console.error(`Registration Error: ' ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const verifyEmail = async (req,res) => {
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

export const registerProfile = async (req, res) => {
    const { verificationToken } = req.cookies;
    const {  firstName, lastName, middleName, sex, track, rank, department, position } = req.body;

    const start = Date.now();
    if(!firstName || !lastName || !sex || !track || !rank || !department || !position) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!verificationToken) {
        return res.json({ error: 'Access denied!' });
    }

    try {
        const decode = jwt.verify(verificationToken, process.env.JWT_SECRET);
        const profilePicture = req.file ? req.file.path  : null;
        var cloudinaryResponse = '';

        if(profilePicture) {
            cloudinaryResponse =  await uploadImageToCloudinary(profilePicture, 'ProfilePictures')
        }

        const userData = await User.create({
            employeeID: decode.employeeID,
            email: decode.email,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            sex: sex,
            track: track,
            rank: rank,
            department: department,
            position: position,
            profilePicture: cloudinaryResponse
        });

        if(userData) {
            res.clearCookie('verificationToken', { path: '/', sameSite: 'None', secure: true });
            const loginToken = jwt.sign({ email: decode.email, role: decode.role }, process.env.JWT_SECRET);
            console.log(`${Date.now() - start}`)
            return res.cookie('loginToken', loginToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Profile Registered Successfully' });
        }

        return res.json({ error: 'There is a problem at the moment please try again later' });
        
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


export const forgotPassword = async (req, res) => {
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

export const resetPassword = async (req, res) => {
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

export const resendOTP = (req, res) => {
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

export const logout = (req, res) => {
    res.clearCookie('loginToken', { path: '/', sameSite: 'none', secure: true });
    return res.json({ message: 'Succesfully Logged Out' })
}
