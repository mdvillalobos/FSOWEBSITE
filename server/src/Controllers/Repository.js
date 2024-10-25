import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import ApplicationForms from '../Models/ApplicationForms.js';
import { filterAndUploadedRequirements, DestroyImageInCloudinary } from '../Helpers/Cloudinary.js';

export const getUserRepository = async (req, res) => {
    const { token } = req.cookies;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userRepositoryData = await ApplicationForms.find({ email: email, purpose: 'repository' });
        return res.json(userRepositoryData);
    }
    catch (error) {
        console.error(`Fetching User Repository Data Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getUserFileInRepository = async (req, res) => {
    const { token } = req.cookies;
    const { selected }  = req.query;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userFile = await ApplicationForms.findOne({ email: email, applyingFor: selected, purpose: 'repository' });
        return res.json(userFile)
    }
    catch (error) {
        console.error(`Fetching User File In Repository Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateRepository = async (req, res) => {
    const { formID, purpose } = req.body;
    
    if(!formID) {
        return res.json({ error: 'Form ID is missing. Please try again later!'})
    }

    try {
        const folderPath = purpose ? purpose === 'application' ? 'requirements' : 'repository' : 'repository'
        const [ cloudinaryResponse, userRepositoryFile ] = await Promise.all([
            filterAndUploadedRequirements(req.files, folderPath),
            ApplicationForms.findOne({ _id: formID })
        ]);

        if(purpose) {
            userRepositoryFile.purpose = purpose;
        }

        for(const requirement of cloudinaryResponse) {
            const dbData = userRepositoryFile.requirements.find(resRequirement => resRequirement.requirementNumber === requirement.requirementNumber);
            if(dbData) {
                await DestroyImageInCloudinary(dbData.filePath, 'repository/');
                dbData.fileName = requirement.fileName;
                dbData.filePath = requirement.filePath
            }
            else {
                userRepositoryFile.requirements.push(requirement);
                userRepositoryFile.requirements.sort((a, b) => a.requirementNumber - b.requirementNumber);
            }
        }
        
        await userRepositoryFile.save();
        return res.json({ message: 'Updated Successfully'});

    } catch (error) {
        console.error(`Updating Repository Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const deleteRepository = async (req, res) => {
    const { formID } = req.body;

    if(!formID) {
        return res.json({ error: 'Form ID missing.'});
    }
    
    try {
        const userForm = await ApplicationForms.findById( formID );

        if (userForm.requirements.length > 0) {
            userForm.requirements.map(async (file) => {
                return await DestroyImageInCloudinary(file.filePath, 'repository/')
            });
        }

        await userForm.deleteOne();
        return res.json('File deleted successfully!')

    } catch (error) {
        console.error(`Deletion Of Repository Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}