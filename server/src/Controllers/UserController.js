import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import User from '../Models/User.js';
import Reports from '../Models/Reports.js';
import Repository from '../Models/Repository.js';
import Credentials from '../Models/Credentials.js';
import { filterAndUploadedRequirements, DestroyImageInCloudinary } from '../Helpers/Cloudinary.js';

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

        return res.json('No data'); 

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

export const addEducation = async (req, res) => {
    const { loginToken } = req.cookies;
    const { level, schoolName, address, year } = req.body;

    if(!level || !schoolName || !address || !year) {
        return res.json({ error: 'Required all fields!'})
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);

        const educationData = {
            level: level,
            schoolName: schoolName,
            address: address,
            yearGraduated: year,
        }

        const userData = await Credentials.findOne({ email: decode.email });

        if(userData) {
            userData.educations.push(educationData);
            await userData.save();
            return res.json({ message: 'Education successfully created!'})
        }

        else {
            await Credentials.create({
                email: decode.email,
                educations: educationData
            });
            return res.json({ message: 'Education successfully created!'})
        }
    }

    catch (error) {
        console.error(`Creating Education Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const addSeminar = async (req, res) => {
    const { loginToken } = req.cookies;
    const { seminarName, date } = req.body;

    if(!seminarName || !date ) {
        return res.json({ error: 'Required all fields!'})
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);

        const seminarData = {
            seminarName: seminarName,
            date: date,
        }

        const userData = await Credentials.findOne({ email: decode.email });

        if(userData) {
            userData.seminars.push(seminarData);
            await userData.save();
            return res.json({ message: 'Seminar successfully created!'})
        }

        else {
            await Credentials.create({
                email: decode.email,
                seminars: seminarData
            });
            return res.json({ message: 'Seminar successfully created!'})
        }
    }

    catch (error) {
        console.error(`Creating Seminar Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const addAchievement = async (req, res) => {
    const { loginToken } = req.cookies;
    const { achievementName, date } = req.body;

    if(!achievementName || !date ) {
        return res.json({ error: 'Required all fields!'})
    }

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);

        const achievementData = {
            achievementName: achievementName,
            date: date,
        }

        const userData = await Credentials.findOne({ email: decode.email });

        if(userData) {
            userData.achievements.push(achievementData);
            await userData.save();
            return res.json({ message: 'Achievement successfully created!'})
        }

        else {
            await Credentials.create({
                email: decode.email,
                achievements: achievementData
            });
            return res.json({ message: 'Achievement successfully created!'})
        }
    }

    catch (error) {
        console.error(`Creating Seminar Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getUserCredentials = async (req, res) => {
    const { loginToken } = req.cookies;
    
    if(!loginToken) { 
        return res.json({ error: 'Access Denied!'});
    }
    
    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userCredentials = await Credentials.findOne({ email: decode.email });
        return res.json(userCredentials);
    }

    catch (error) {
        console.error(`Fetching User Credentials Error: ${ error.message }`);
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
        await Reports.create({
            email: decode.email,
            subject,
            message,
            date
        });

        return res.json({ message: 'Report successfully submitted!' });
        
    } catch (error) {
        console.error(`Report Submittion Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

