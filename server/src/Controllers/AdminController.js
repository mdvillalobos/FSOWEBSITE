import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import Reports from '../Models/Reports.js';
import Ranks from '../Models/Ranks.js';
import ApplicationForms from '../Models/ApplicationForms.js';

dotenv.config();
export const getAllReports = async (req, res) => {
    try {
        const reports = await Reports.find();
        return res.json(reports);
    }

    catch (error) {
        console.error(`Fetching Reports Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!'});
    }
}

export const getAllApprovers = async (req, res) => {
    try {
        const approvers = await Account.find({ 'accountinfo.approver': { $ne: null }}, { 'accountinfo.email': 1, 'accountinfo._id': 1, 'accountinfo.approver': 1, 'accountinfo.lastName': 1, 'accountinfo.firstName': 1, 'accountinfo.profilePicture': 1, 'accountinfo.sex': 1 }).sort({ 'accountinfo.approver': 1 })
        if(approvers) {
            return res.json(approvers)
        }
        return res.json(null)
    }
    catch (error) {
        console.error(`Fetching Reports Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!'});
    }
}

export const getRanks = async (req, res) => {
    const { token } = req.cookies;

    if(!token) {
        return res.json(null);
    }

    try {
        const rankData = await Ranks.find();
        if(!rankData) {
            return res.json({ error: 'Ranks are currently empty.' });
        }  
        
        return res.json(rankData)

    } catch (error) {
        console.error(`Fetching Rank Requirement Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const createRank = async (req, res) => {
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

        return res.json({ message: 'Rank successfully created.' });


    } catch (error) {
        console.error(`Creation Of Rank Error: ${ error.message }`);  
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
} 


export const getApplicationsForReRanking = async (req, res) => {
    const { token } = req.cookies;
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await Account.findOne({ email: email });

        const approverMapping = {
            'Approver 1': null,
            'Approver 2': 'Approver 1',
            'Approver 3': 'Approver 2',
            'Approver 4': 'Approver 3'
        };

        const previousApprover = approverMapping[userData.accountinfo.approver];
        if(previousApprover !== undefined) {
            const applications = await ApplicationForms.find({ prevApprover: previousApprover, purpose: 'application', applicationStatus: 'For approval',});
            return res.json(applications)
        }
        
        return res.json(null)


    } catch (error) {
        console.error(`Fetching Applications Error: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}