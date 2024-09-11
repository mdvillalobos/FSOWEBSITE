require('dotenv').config();
const jwt = require('jsonwebtoken');

const Account = require('../Models/Account');
const User = require('../Models/User');
const Reports = require('../Models/Reports');
const Ranks = require('../Models/Ranks');
const ApplicationForms = require('../Models/ApplicationForms');
const { hashPassword, comparePassword } = require('../Helpers/Auth');

const getAllReports = async (req, res) => {
    try {
        const reports = await Reports.find();
        
        if(reports) {
            return res.json(reports);
        }

        return res.json({
            error: "Sorry. There's a problem while retrieving the data. Please try again later."
        })
    }

    catch (error) {
        return res.json(error)
    }
}

const createRank = async (req, res) => {
    const {rankName, track, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10} = req.body;

    try {
        if(!rankName || !track) {
            return res.json({
                error: 'Required All Fields'
            })
        }

        const isRankExisting = await Ranks.findOne({rankName: rankName, track: track})

        if(!isRankExisting) {
            const data = await Ranks.create({
                rankName: rankName,
                track: track,
                requirement_1: requirement_1,
                requirement_2: requirement_2,
                requirement_3: requirement_3,
                requirement_4: requirement_4,
                requirement_5: requirement_5,
                requirement_6: requirement_6,
                requirement_7: requirement_7,
                requirement_8: requirement_8,
                requirement_9: requirement_9,
                requirement_10:  requirement_10,
            })
    
            if(!data) {
                return res.json({
                    error: 'Error creating data. Please try again later.'
                })
            }
            return res.json(data);
        }

        return res.json({
            error: `Rank is already existing in ${track}` 
        })

    } catch (error) {
        console.log(error)    
    }
} 

const getAllRanks = async (req, res) => {
    try {
        const rankList = await Ranks.find();
        
        if(rankList) {
            return res.json(rankList);
        }

        return res.json({
            error: "Sorry. There's a problem while retrieving the data. Please try again later."
        });

    } catch (error) {
        
    }
}


const getApplicationsForReRanking = async (req, res) => {
    const { loginToken } = req.cookies;
    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userInfo = await Account.findOne({email: decode.email});

        if(userInfo.approver == 'Approver1') {
            const applications = await ApplicationForms.find({prevApprover: null});
            return res.json(applications);
        }

        if(userInfo.approver == 'Approver2') {
            const applications = await ApplicationForms.find({prevApprover: 'Approver1'});
            return res.json(applications);
        }

        if(userInfo.approver == 'Approver3') {
            const applications = await ApplicationForms.find({prevApprover: 'Approver2'});
            return res.json(applications);
        }

        if(userInfo.approver == 'Approver4') {
            const applications = await ApplicationForms.find({prevApprover: 'Approver3'});
            return res.json(applications);
        }

        return res.json({
            error: 'Sorr! We encounter a problem while retrieving the data. Please try again later.'
        })

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllReports,
    createRank,
    getAllRanks,
    getApplicationsForReRanking,
}