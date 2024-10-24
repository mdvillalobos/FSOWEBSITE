import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import validator from 'validator';
import Account from '../Models/Account.js';
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
        return res.cookie('token', loginToken, { httpOnly: true, secure: true, sameSite:'None' }).json({ message: 'Login Successfully', data: user.accountinfo });

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

        sendEmailVerification(userAccount.email);
        const verificationToken = jwt.sign({ email: email, role: userRole }, process.env.JWT_SECRET);
        return res.cookie('token', verificationToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Registered Successfully' }); 

    } catch (error) {
        console.error(`Registration Error: ' ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const verifyEmail = async (req,res) => {
    const { token } = req.cookies;
    const { otp } = req.body;

    if(!otp) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!token) {
        return res.json({ error: 'Access denied.'});
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userOTP = await EmailVerification.findOne({ owner: email });

        if(!userOTP) {
            return res.json({ error: 'Please resend your One-Time-Pin' });
        }

        const isOTPCorrect = await compareHashed(otp, userOTP.Otp);

        if(!isOTPCorrect) {
            return res.json({ error: 'Incorrect One-Time-Pin!' });
        }

        await EmailVerification.deleteOne({ owner: email })
        return res.json({ message: 'OTP verified successfully.' });

    } catch (error) {
        console.error(`Email Verification Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const registerProfile = async (req, res) => {
    const { token } = req.cookies;
    const {  firstName, lastName, middleName, contact, sex, track, rank, college, department, status } = req.body;

    if(!firstName || !lastName || !contact || !sex || !track || !rank || !college || !department || !status) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!token) {
        return res.json({ error: 'Access denied!' });
    }

    try {
        const { email, role } = jwt.verify(token, process.env.JWT_SECRET);
        const profilePicture = req.file ? req.file.path  : null;
        var cloudinaryResponse = '';

        if(profilePicture) {
            cloudinaryResponse =  await uploadImageToCloudinary(profilePicture, 'ProfilePictures')
        }
        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            contact: contact,
            sex: sex,
            status: status,
            track: track,
            rank: rank,
            college: college,
            department: department,
            profilePicture: cloudinaryResponse
        };

        await Account.findOneAndUpdate({ email }, { $push: { accountinfo: userInfo } }, { new: true, runValidators: true });
        
        res.clearCookie('verificationToken', { path: '/', sameSite: 'None', secure: true });
        const loginToken = jwt.sign({ email: email, role: role }, process.env.JWT_SECRET);
        return res.cookie('token', loginToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Profile Registered Successfully', });
 
    } catch (error) {
        console.error(`Profile Registration Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email || !emailRegex.test(email)) {
        return res.json({ error: 'Please enter a valid email' });
    }

    try {
        const user = await Account.findOne({ email })
        
        if(!user) {
            return res.json({ error: "Email doesn't exist!" });
        }
        
        sendEmailVerification(email);
        const verificationToken = jwt.sign({ email: email }, process.env.JWT_SECRET);
        return res.cookie('token', verificationToken, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Email is valid' });
        
    } catch (error) {
        console.error(`Forgot Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const resetPassword = async (req, res) => {
    const { password , confirmPassword } = req.body
    const { token } = req.cookies;

    if(!password || !confirmPassword) {
        return res.json({ error: 'Required all fields!' });
    }

    if(!validator.isStrongPassword(password)) {
        return res.json({ error: 'The Password must contain one uppercase, one lowercase, one number, one special character and with length of 8-16' });
    }

   
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const hashedPassword = await hashPassword(password);

        await Account.updateOne({ email: email }, { password: hashedPassword });

        res.clearCookie('verificationToken', { path: '/', sameSite: 'none', secure: true });

        return res.json({ success: true, message: 'User password reset successfully' });

    } catch (error) {
        console.error(`Reset Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const resendOTP = (req, res) => {
    const { token } = req.cookies;

    if(!token) {
        return res.json({ error: 'Access denied!' });
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        sendEmailVerification(email);

        return res.json({ message: 'OTP sent successfully!' });
        
    } catch (error) {
        console.error(`Resend One Time Pin Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });;
    }
}

export const logout = (req, res) => {
    res.clearCookie('token', { path: '/', sameSite: 'none', secure: true });
    return res.json({ message: 'Logged out successfully' })
}
