require('dotenv').config();
const jwt = require('jsonwebtoken');
const ApplicationForms = require('../Models/ApplicationForms');
const Ranks = require('../Models/Ranks');
const Account = require('../Models/Account');

const getRankRequirement = async (req, res) => {
    const { rank } = req.query;
    const { loginToken } = req.cookies;
    try {
        if(loginToken) {
            if(rank) {
                const rankRequirement = await Ranks.findOne({rankName: rank});
                if(rankRequirement) {
                    return res.json(rankRequirement);
                }  

                return res.json({
                    error: "Sorry! There's problem while retrieving the data. Please try again later."
                });
            }

            else {
                res.json({error: 'rank required'})
            }
        }

        else {
            res.json({ 
                error: "Sorry but you're not allowed to access this action."
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const submitApplicationEntry = async (req, res) => {
    const { loginToken } = req.cookies;
    const { name, college, department, currentRank, academicYear, ApplyingFor, userTrack } = req.body;
    try {
        const requirement_1 = req.files['requirement_1'] ? req.files['requirement_1'][0].path : null;
        const requirement_2 = req.files['requirement_2'] ? req.files['requirement_2'][0].path : null;
        const requirement_3 = req.files['requirement_3'] ? req.files['requirement_3'][0].path : null;
        const requirement_4 = req.files['requirement_4'] ? req.files['requirement_4'][0].path : null;
        const requirement_5 = req.files['requirement_5'] ? req.files['requirement_5'][0].path : null;
        const requirement_6 = req.files['requirement_6'] ? req.files['requirement_6'][0].path : null;
        const requirement_7 = req.files['requirement_7'] ? req.files['requirement_7'][0].path : null;
        const requirement_8 = req.files['requirement_8'] ? req.files['requirement_8'][0].path : null;
        const requirement_9 = req.files['requirement_9'] ? req.files['requirement_9'][0].path : null;
        const requirement_10 = req.files['requirement_10'] ? req.files['requirement_10'][0].path : null;

        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const application = ApplicationForms.create({
            name: name,
            email: decode.email,
            college: college,
            department: department,
            currentRank: currentRank,
            academicYear: academicYear,
            applyingFor: ApplyingFor,
            track: userTrack,
            requirement_1: requirement_1,
            requirement_2: requirement_2,
            requirement_3: requirement_3,
            requirement_4: requirement_4,
            requirement_5: requirement_5,
            requirement_6: requirement_6,
            requirement_7: requirement_7,
            requirement_8: requirement_8,
            requirement_9: requirement_9,
            requirement_10: requirement_10,
        });

        if(application) {
            return res.json({
                message: 'Application Submitted'
            })
        }

        return res.json({
            error: "Sorry! We encountered a problem while submitting your application. Please try again later."
        })

    } catch (error) {
        console.log(error)
    }
}

const checkApplication = async (req, res) => {
    const { loginToken } = req.cookies;
    const { formID, decision, checkedReq1, checkedReq2, checkedReq3, checkedReq4, checkedReq5, checkedReq6, checkedReq7, checkedReq8, checkedReq9, checkedReq10} = req.body;
    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userInfo = await Account.findOne({email: decode.email});
        console.log(formID)
        console.log(userInfo.approver)
        if(decision === 'Approved') {
            await ApplicationForms.findOneAndUpdate(
                { _id: formID }, 
                [{$set: { approvedBy: { $concat: ['$approvedBy', userInfo.approver, ', ']}, prevApprover: userInfo.approver, isApproved_requrement_1: checkedReq1, isApproved_requrement_2: checkedReq2, isApproved_requrement_3: checkedReq3, 
                isApproved_requrement_4: checkedReq4, isApproved_requrement_5: checkedReq5, isApproved_requrement_6: checkedReq6, isApproved_requrement_7: checkedReq7, 
                isApproved_requrement_8: checkedReq8, isApproved_requrement_9: checkedReq9, isApproved_requrement_10: checkedReq10}}]
            );
            return res.json({message: 'Succesfully Approved'});
        }

        if (decision === 'Declined') {
            await ApplicationForms.findOneAndUpdate(
                { _id: formID }, 
                { prevApprover: userInfo.approver, declinedBy: userInfo.approver, status: decision, isApproved_requrement_1: checkedReq1, isApproved_requrement_2: checkedReq2, isApproved_requrement_3: checkedReq3, 
                isApproved_requrement_4: checkedReq4, isApproved_requrement_5: checkedReq5, isApproved_requrement_6: checkedReq6, isApproved_requrement_7: checkedReq7, 
                isApproved_requrement_8: checkedReq8, isApproved_requrement_9: checkedReq9, isApproved_requrement_10: checkedReq10 }
            );
            return res.json({message: 'Declined Application'});
        }

        return res.json({
            error: 'Problem'
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    submitApplicationEntry,
    getRankRequirement,
    checkApplication,
}