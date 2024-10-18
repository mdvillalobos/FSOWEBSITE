import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Account from '../Models/Account.js';
import User from '../Models/User.js';
import { uploadImageToCloudinary } from '../Helpers/Cloudinary.js';
import { hashPassword, compareHashed } from '../Helpers/Auth.js';

export const changePassword = async (req, res) => {
    const { loginToken } = req.cookies;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if(!oldPassword || !newPassword || !confirmNewPassword) {
        return res.json({ error: 'Required all fields!'});
    }

    if(!loginToken) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userData = await Account.findOne({ email: decode.email });
        if(!userData) {
            return res.json({ error: 'User data not found '});
        }

        const isOldPasswordCorrect = await compareHashed(oldPassword, userData.password);
        if(!isOldPasswordCorrect) {
            return res.json({ error: 'Incorrect Old Password' });
        }

        if(!validator.isStrongPassword(newPassword)) {
            return res.json({ error: 'Password must contain one uppercase, one lowecase, one number and one special character.'});
        }

        if(newPassword != confirmNewPassword) {
            return res.json({ error: 'New password do not match!' });
        }

        const hashedPassword = await hashPassword(newPassword);
        await Account.updateOne({email: userData.email}, {$set: { password: hashedPassword }});
        return res.json({ message: 'Password updated successfully.' });
   
    } catch (error) {
        console.error(`Change Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateName = async (req, res) => {
    const { loginToken } = req.cookies;
    const { firstName, lastName, middleName } = req.body;

    if(!loginToken) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET); 
        const updateUserCredentials = await User.updateOne({ email: decode.email }, { $set: { lastName: lastName, firstName: firstName, middleName: middleName }});

        if(!updateUserCredentials) {
            return res.json({ error: 'User data not found!' });
        }

        return res.json({ message: 'Successfully updated user name.' });
        
    } catch (error) {
        console.error(`Update User Details Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateOtherInfo = async(req, res) => {
    const { loginToken } = req.cookies;
    const { sex, department, position } = req.body;

    if(!loginToken )  {
        return res.json({ error: 'Access Denied!'});
    }

    if(!sex || !department || !position ) {
        return res.json({ error: 'Required all fields'});
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);

        const updateOtherInfo = await User.updateOne({ email: decode.email }, { $set: { sex: sex, department: department, position: position}});

        if(!updateOtherInfo) {
            return res.json({ error: 'User data not found!' });
        }

        return res.json({ message:  'Successfully updated user other information.' });
    }
    catch (error) {
        console.error(`Update Other Information Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


export const updateProfilePicture = async (req, res) => {
    const { loginToken } = req.cookies;

    if(!loginToken) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const userEmail = jwt.verify(loginToken, process.env.JWT_SECRET);
        const uploadedPicture = req.file ? req.file.path : null;

        const userData = await User.findOne({ email: userEmail.email });

        userData.profilePicture ? await DestroyImageInCloudinary(userData.profilePicture) : null;
        userData.profilePicture = uploadedPicture ? await uploadImageToCloudinary(uploadedPicture, 'profilepictures') : uploadedPicture;
        await userData.save();
        return res.json({ message: 'Profile Picture Successfully Changed' });
    
    }

    catch(error) {
        console.error(`Update Profile Picture Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}