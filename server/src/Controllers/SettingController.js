import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Account from '../Models/Account.js';
import { uploadImageToCloudinary } from '../Helpers/Cloudinary.js';
import { hashPassword, compareHashed } from '../Helpers/Auth.js';

export const changePassword = async (req, res) => {
    const { token } = req.cookies;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if(!oldPassword || !newPassword || !confirmNewPassword) {
        return res.json({ error: 'Required all fields!'});
    }

    if(!token) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await Account.findOne({ email });

        if(!userData) {
            return res.json({ error: ' User data not found '});
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
        await Account.updateOne({ email: userData.email }, {$set: { password: hashedPassword }});
        return res.json({ message: 'Password updated successfully.' });
   
    } catch (error) {
        console.error(`Change Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateName = async (req, res) => {
    const { token } = req.cookies;
    const { firstName, lastName, middleName, id } = req.body;

    if(!token) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET); 
        const updatedUserCredentials = await Account.findOneAndUpdate({ email, 'accountinfo._id': id },
            {
                $set: {
                    'accountinfo.$.lastName': lastName,
                    'accountinfo.$.firstName': firstName,
                    'accountinfo.$.middleName': middleName,
                },
            },
            { new: true, runValidators: true }
        );

        if(!updatedUserCredentials) {
            return res.json({ error: 'User data not found!' });
        }

        return res.json({ message: 'Successfully updated user name.' });
        
    } catch (error) {
        console.error(`Update User Details Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateOtherInfo = async(req, res) => {
    const { token } = req.cookies;
    const { sex, college, department, position, id } = req.body;

    if(!token )  {
        return res.json({ error: 'Access Denied!'});
    }

    if(!sex || !department || !position ) {
        return res.json({ error: 'Required all fields'});
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const updateOtherInfo = await Account.updateOne({ email, 'accountinfo._id': id }, 
            { 
                $set: { 
                    'accountinfo.$.sex': sex,
                    'accountinfo.$.college': college,
                    'accountinfo.$.department': department,
                    'accountinfo.$.position': position,
                }
            },
            { new: true, runValidators: true }
        );

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
    const { token } = req.cookies;
    const { id } = req.body;

    if(!token) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const { email} = jwt.verify(token, process.env.JWT_SECRET);
        const uploadedPicture = req.file ? req.file.path : null;

        const userData = await Account.findOne({ email, 'accountinfo._id': id});
        const accountInfo = userData.accountinfo.id(id);

        if (accountInfo.profilePicture) {
            await DestroyImageInCloudinary(accountInfo.profilePicture);
        }
        accountInfo.profilePicture = uploadedPicture ? await uploadImageToCloudinary(uploadedPicture, 'ProfilePictures') : null;
        await userData.save();
        return res.json({ message: 'Profile Picture Successfully Changed' });
        /* userData.accountinfo.profilePicture ? await DestroyImageInCloudinary(userData.profilePicture) : null;
        userData.accountinfo.profilePicture = uploadedPicture ? await uploadImageToCloudinary(uploadedPicture, 'profilepictures') : uploadedPicture;
        await userData.save();
        return res.json({ message: 'Profile Picture Successfully Changed' }); */
    }

    catch(error) {
        console.error(`Update Profile Picture Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}