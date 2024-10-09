require('dotenv').config();
const jwt = require('jsonwebtoken');
const Account = require('../Models/Account');
const User = require('../Models/User');
const Reports = require('../Models/Reports');
const Ranks = require('../Models/Ranks');
const ApplicationForms = require('../Models/ApplicationForms');

const getAllReports = async (req, res) => {
    try {
        const reports = await Reports.find();
        return res.json(reports);
    }

    catch (error) {
        console.error(`Fetching Reports Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!'});
    }
}

const getAllApprovers = async (req, res) => {
    try {
        const approvers = await User.find({ approver: { $ne: null }}, { email: 1, _id: 1, approver: 1, lastName: 1, firstName: 1, profilePicture: 1, sex: 1 }).sort({ approver: 1})
        console.log(approvers)
        return res.json(approvers)
    }
    catch (error) {
        console.error(`Fetching Reports Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!'});
    }
}

const createRank = async (req, res) => {
    const { rankName, track, ...requirements } = req.body;

    if(!rankName || !track) {
        return res.json({ error: 'Required all fields!' });
    }

    try {
        const isRankExisting = await Ranks.findOne({ rankName: rankName, track: track });

        if(isRankExisting) { 
            return res.json({ error: `Rank is already existed from ${track}` }) 
        } 

        const rankRequirements = Object.values(requirements).map((data, i) => ({
            requirementNumber: i + 1,
            requirement: data,
        }))

        const newRank = await Ranks.create({ 
            rankName: rankName, 
            track: track, 
            requirements: rankRequirements 
        }) 

        return res.json({ success: true, message: 'Rank successfully created.', data: newRank });


    } catch (error) {
        console.error(`Creation Of Rank Error: ${ error.message }`);  
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
} 


const getApplicationsForReRanking = async (req, res) => {
    const { loginToken } = req.cookies;
    try {
        const { email } = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userData = await User.findOne({ email: email });

        const approverMapping = {
            'Approver 1': null,
            'Approver 2': 'Approver 1',
            'Approver 3': 'Approver 2',
            'Approver 4': 'Approver 3'
        };

        const previousApprover = approverMapping[userData.approver];
        if(previousApprover !== undefined) {
            const applications = await ApplicationForms.find({ prevApprover: previousApprover, status: 'For Approval' });
            return res.json(applications)
        }
        
        return res.json(null)


    } catch (error) {
        console.error(`Fetching Applications Error: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}

module.exports = {
    getAllReports,
    getAllApprovers,
    createRank,
    getApplicationsForReRanking,
}