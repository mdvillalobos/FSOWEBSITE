import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import Reports from '../Models/Reports.js';
import Credentials from '../Models/Credentials.js';
import ApplicationForms from '../Models/ApplicationForms.js';

export const getUserData = async (req, res) => {
    const { token } = req.cookies;

    if(!token) {
        return res.json('tae');
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userCredentials = await Account.findOne({ email });

        if (userCredentials) {
            const userObject = {
                ...userCredentials.accountinfo.toObject()[0],
                email: email,
                role: userCredentials.role,
                employeeID: userCredentials.employeeID
            };
            console.log(userObject)

            return res.json(userObject);
        }

        return res.json(null); 

    } catch (error) {
        console.error(`Fetching User Data Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const addEducation = async (req, res) => {
    const { token } = req.cookies;
    const { level, schoolName, address, year } = req.body;

    if(!level || !schoolName || !address || !year) {
        return res.json({ error: 'Required all fields!'})
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const educationData = {
            level: level,
            schoolName: schoolName,
            address: address,
            yearGraduated: year,
        }

        const userData = await Credentials.findOne({ email });

        if(userData) {
            userData.educations.push(educationData);
            await userData.save();
            return res.json({ message: 'Education successfully created!'})
        }

        else {
            await Credentials.create({
                email: email,
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
    const { token } = req.cookies;
    const { seminarName, year } = req.body;

    if(!seminarName || !year ) {
        return res.json({ error: 'Required all fields!'})
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const seminarData = {
            seminarName: seminarName,
            year: year,
        }

        const userData = await Credentials.findOne({ email });

        if(userData) {
            userData.seminars.push(seminarData);
            await userData.save();
            return res.json({ message: 'Seminar successfully created!'})
        }

        else {
            await Credentials.create({
                email: email,
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
    const { token } = req.cookies;
    const { achievementName, year } = req.body;

    if(!achievementName || !year ) {
        return res.json({ error: 'Required all fields!'})
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const achievementData = {
            achievementName: achievementName,
            year: year,
        }

        const userData = await Credentials.findOne({ email });

        if(userData) {
            userData.achievements.push(achievementData);
            await userData.save();
            return res.json({ message: 'Achievement successfully created!'})
        }

        else {
            await Credentials.create({
                email: email,
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
    const { token } = req.cookies;
    
    if(!token) { 
        return res.json({ error: 'Access Denied!'});
    }
    
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userCredentials = await Credentials.findOne({ email });
        return res.json(userCredentials);
    }

    catch (error) {
        console.error(`Fetching User Credentials Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getUserReports = async (req, res) => {
    const { token } = req.cookies;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userReportsData = await Reports.find({ email });
        return res.json(userReportsData);
        
    } catch (error) {
        console.error(`Fetching User Reports Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const submitReport = async (req, res) => {
    const { token } = req.cookies;
    const { subject, message, date } = req.body;

    if(!subject || !message || !date) {
        return res.json({ error: 'Required all fields!' });
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        await Reports.create({
            email: email,
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


