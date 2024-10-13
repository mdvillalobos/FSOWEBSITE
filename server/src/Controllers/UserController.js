import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Account from '../Models/Account.js';
import User from '../Models/User.js';
import Reports from '../Models/Reports.js';
import Repository from '../Models/Repository.js';
import { uploadImageToCloudinary, filterAndUploadedRequirements, DestroyImageInCloudinary } from '../Helpers/Cloudinary.js';
import { hashPassword, compareHashed } from '../Helpers/Auth.js';

export const getUserData = async (req, res) => {
    const { loginToken } = req.cookies;

    if(!loginToken) {
        return res.json(null);
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userCredentials = await User.findOne({ email: decode.email });

        if (userCredentials) {
            const userData = userCredentials.toObject()
            return res.json(userData);
        }

        return res.json('No data found'); 

    } catch (error) {
        console.error(`Fetching User Data Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getRole = async (req, res) => {
    const { loginToken } = req.cookies;

    if(!loginToken) {
        return res.json(null);
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);

        const userRole = await Account.findOne({email: decode.email});

        if(userRole) {
            return res.json(userRole.role);
        }

        return res.json(null);

    } catch (error) {
        console.error(`Fetching User Role Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getUserRepository = async (req, res) => {
    const { loginToken } = req.cookies;

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userRepositoryData = await Repository.find({ email: decode.email });
        return res.json(userRepositoryData);
    }
    catch (error) {
        console.error(`Fetching User Repository Data Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateRepository = async (req, res) => {
    const { formID } = req.body;

    if(!formID) {
        return res.json({ error: 'Form ID is missing. Please try again later!'})
    }

    try {
        const [ cloudinaryResponse, userRepositoryFile ] = await Promise.all([
            filterAndUploadedRequirements(req.files, 'repository'),
            Repository.findOne({ _id: formID })
        ])

        for( const requirement of cloudinaryResponse) {
            const dbData = userRepositoryFile.requirements.find(resRequirement => resRequirement.requirementNumber === requirement.requirementNumber);
            console.log(dbData)

            if(dbData) {
                const deletedFile = await DestroyImageInCloudinary(dbData.filePath);
                console.log(deletedFile)
                dbData.fileName = requirement.fileName;
                dbData.filePath = requirement.filePath
            }
            else {
                userRepositoryFile.requirements.push({
                    requirement
                });
            }
        }
        
        await userRepositoryFile.save();
        return res.json({ message: 'Updated Successfully'});

        
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


export const getUserReports = async (req, res) => {
    const { loginToken } = req.cookies;

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userReportsData = await Reports.find({ email: decode.email });
        return res.json(userReportsData);
        
    } catch (error) {
        console.error(`Fetching User Reports Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const submitReport = async (req, res) => {
    const { loginToken } = req.cookies;
    const { subject, message, date } = req.body;

    if(!subject || !message || !date) {
        return res.json({ error: 'Required all fields!' });
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userReport = await Reports.create({
            email: decode.email,
            subject,
            message,
            date
        });

        return res.json({ message: 'Report successfully submitted!', data: userReport});
        
    } catch (error) {
        console.error(`Report Submittion Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateProfile = async (req, res) => {
    const { loginToken } = req.cookies;
    const { firstName, lastName, middleName, department } = req.body;

    if(!loginToken) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET); 
        const updateUserCredentials = await User.updateOne({ email: decode.email }, { $set: { lastName: lastName, firstName: firstName, middleName: middleName, department: department }});

        if(!updateUserCredentials) {
            return res.json({ error: 'User data not found!' });
        }

        return res.json(updateUserCredentials);
        
    } catch (error) {
        console.error(`Update User Details Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

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

export const updateProfilePicture = async (req, res) => {
    const { loginToken } = req.cookies;

    if(!loginToken) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const userEmail = jwt.verify(loginToken, process.env.JWT_SECRET);
        const uploadedPicture = req.file['profilePicture'] ? req.file['profilePicture'].path : null;
        const userData = await User.findOne({ email: userEmail.email });

        const [ deleteFromCloudinary, uploadToCloudinary ] = await Promise.all([
            DestroyImageInCloudinary(userData.profilePicture),
            uploadImageToCloudinary(uploadedPicture, 'profilepictures'),
        ])

        profilePicture = uploadToCloudinary;
        await userData.save();
        return res.json({ message: 'Profile Picture Successfully Changed' });

    }

    catch(error) {
        console.error(`Update Profile Picture Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}
