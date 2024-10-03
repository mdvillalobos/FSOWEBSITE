require('dotenv').config();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Account = require('../Models/Account');
const Ranks = require('../Models/Ranks');
const User = require('../Models/User');
const Reports = require('../Models/Reports');

const { hashPassword, compareHashed } = require('../Helpers/Auth');

const getUserData = async (req, res) => {
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

const getRole = async (req, res) => {
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

const getRankList = async (req, res) => {
    const { loginToken } = req.cookies;

    try {
        const userEmail = jwt.verify(loginToken, process.env.JWT_SECRET);

        const userTrack = await User.findOne({ email: userEmail.email });

        const rank = await Ranks.find({ track: userTrack.track });
        return res.json(rank);
        
    } catch (error) {
        console.error(`Fetching Ranklist Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const getUserReports = async (req, res) => {
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

const submitReport = async (req, res) => {
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

const updateProfile = async (req, res) => {
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

const changePassword = async (req, res) => {
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

const updateProfilePicture = async (req, res) => {
    const { loginToken } = req.cookies;

    if(!loginToken) {
        return res.json({ error: 'Access denied!'});
    }

    try {
        const userEmail = jwt.verify(loginToken, process.env.JWT_SECRET);
        await User.updateOne({ email: userEmail.email }, {$set: { profilePicture: req.files['profilePicture'][0].path }})

        return res.json('Profile Picture Successfully Changed');
    }

    catch(e) {
        console.error(`Update Profile Picture Error: ${ error.message}`);
    }
}


module.exports = {
    getUserData,
    getRole,
    getRankList,
    submitReport,
    getUserReports,
    updateProfile,
    changePassword,
}
