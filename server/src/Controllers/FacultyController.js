require('dotenv').config();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Account = require('../Models/Account');
const Ranks = require('../Models/Ranks');
const User = require('../Models/User');
const Reports = require('../Models/Reports');

const { hashPassword, comparePassword } = require('../Helpers/Auth');

const getUserData = (req, res) => {
    const {loginToken} = req.cookies

    try {
        if(loginToken) {
            jwt.verify(loginToken, process.env.JWT_SECRET, {}, async (err, user) => {
                if(err) throw err;
                const userCredentials = await User.findOne({email: user.email});
    
                const userData = {
                    ...userCredentials.toObject(),
                }
    
                return res.json(userData);
            })
        }
    
        else {
            return res.json(null);
        }
    } catch (error) {
        console.log(error);
    }
}

const getRole = (req, res) => {
    const {loginToken} = req.cookies

    try {
        if(loginToken) {
            jwt.verify(loginToken, process.env.JWT_SECRET, {}, async (err, user) => {
                if(err) throw err;
                const userRole = await Account.findOne({email: user.email});
                return res.json(userRole.role);
            });
        }

        else {
            return res.json(null);
        }
    } catch (error) {
        console.log(error);
    }
}

const updateProfile = async (req, res) => {
    const {loginToken} = req.cookies;
    const {employeeID, email, firstName, lastName, middleName, department} = req.body;

    try {
        jwt.verify(loginToken, process.env.JWT_SECRET, {}, async (err, user) => {
            if(err) throw err;
            const userCredentials = await User.findOneAndUpdate({email: user.email}, {email: email, lastName: lastName, firstName: firstName, middleName: middleName, employeeID: employeeID, department: department});
            return res.json(userCredentials);
        });
        
    } catch (error) {
        console.log(error);
    }
}

const changePassword = async (req, res) => {
    const {loginToken} = req.cookies;
    const {oldPassword, newPassword, confirmNewPassword} = req.body;

    try {
        if(!oldPassword || !newPassword || !confirmNewPassword) {
            return res.json({
                error: 'Kindly fill up all the fields'
            });
        }

        const userEmail = jwt.verify(loginToken, process.env.JWT_SECRET);
        const user = await Account.findOne({email: userEmail.email});
        const isOldPasswordCorrect = await comparePassword(oldPassword, user.password);

        if(!isOldPasswordCorrect) {
            return res.json({
                error: 'Incorrect Old Password'
            });
        }

        if(!validator.isStrongPassword(newPassword)) {
            return res.json({
                error: 'Password Must Contain One Uppercase, One Lowercase. One Number and One Special Character.'
            });
        }

        if(newPassword != confirmNewPassword) {
            return res.json({
                error: 'New password and Confirm Password dont matched'
            });
        }

        const hashedPassword = await hashPassword(newPassword);
        const updatePassword = await Account.findOneAndUpdate({email: user.email}, {password: hashedPassword});

        if(updatePassword) {
            return res.json(user.email);
        }

        return res.json({
            error: "We're unable to update your password. Please try again later."
        });
   
    } catch (error) {
        console.log(error);
    }
}

const submitReport = async (req, res) => {
    const {loginToken} = req.cookies;
    const {subject, message, date} = req.body;

    try {
        if(!subject || !message || !date) {
            return res.json({
                error: 'Kindlyy fill up all the fields'
            });
        }

        const userEmail = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userReport = await Reports.create({
            email: userEmail.email,
            subject,
            message,
            date
        });

        if(userReport) {
            return res.json(userReport);
        }

        return res.json({
            error: "Sorry. We encountered a problem while submitting your data. Please try again later."
        });
        

    } catch (error) {
        console.log(error);
    }
}

const getUserReports = async (req, res) => {
    const { loginToken } = req.cookies;

    try {
        const userEmail = jwt.verify(loginToken, process.env.JWT_SECRET);
        const UserReportData = await Reports.find({email: userEmail.email});

        if(UserReportData) {
            return res.json(UserReportData);
        }

        return res.json({
            error: "Sorry, we're having trouble getting your reports. Please try again later."
        });
        
    } catch (error) {
        console.log(error);
    }
}

const getRankList = async (req, res) => {
    const { loginToken } = req.cookies;

    try {
        const userEmail = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userTrack = await User.findOne({email: userEmail.email});
        
        if(userTrack) {
            const rank = await Ranks.find({track: userTrack.track});
            return res.json(rank);
        }
        return res.json({
            error: "Sorry, we're having trouble getting the Rank list. Please try again later."
        });

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUserData,
    getRole,
    updateProfile,
    changePassword,
    submitReport,
    getUserReports,
    getRankList,
}
