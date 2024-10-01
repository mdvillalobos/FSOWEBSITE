require('dotenv').config();
const jwt = require('jsonwebtoken');
const ApplicationForms = require('../Models/ApplicationForms');
const Ranks = require('../Models/Ranks');
const Account = require('../Models/Account');
const CloudinaryUpload = require('../Helpers/Cloudinary');

const getRankRequirement = async (req, res) => {
    const { rank } = req.query;
    const { loginToken } = req.cookies;

    if(!loginToken) {
        return res.json({ error: 'Access denied!'});
    }

    if(!rank) {
        return res.json({ error: 'Rank is required.' });
    }

    try {
        const rankRequirement = await Ranks.findOne({ rankName: rank });
        if(!rankRequirement) {
            return res.json({ error: 'Rank not found.' });
        }  
        
        return res.json(rankRequirement);

    } catch (error) {
        console.error(`Fetching Rank Requirement Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const submitApplicationEntry = async (req, res) => {
    console.log('Function Running!')
    const { loginToken } = req.cookies;
    const { name, college, department, currentRank, academicYear, ApplyingFor, userTrack } = req.body;

    if(!name || !college || !department || !currentRank || !academicYear || !ApplyingFor || !userTrack) {
        return res.json({ error: 'Required all fields.'})
    }

    try {
        const requirements = Array.from({ length: 10 }, (_, i) => req.files[`requirement_${i + 1}`]?.[0]?.path || null);

        const { email } = jwt.verify(loginToken, process.env.JWT_SECRET);
        const applicationForm = await ApplicationForms.create({
            name: name,
            email: email,
            college: college,
            department: department,
            currentRank: currentRank,
            academicYear: academicYear,
            applyingFor: ApplyingFor,
            track: userTrack,
            ...Object.fromEntries(requirements.map((path, i) => [`requirement_${i + 1}`, path]))
        });

        const uploadPromises = requirements
            .filter(path => path) // Filter out null paths
            .map((path, i) => CloudinaryUpload(path, 'requirements'));

        await Promise.all(uploadPromises); // Wait for all uploads to complete
        
        return res.json('Success');

    } catch (error) {
        console.error(`Submiiton Of Application For Re-Ranking Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const checkApplication = async (req, res) => {
    const { loginToken } = req.cookies;
    const { formID, decision, ...checkedRequirements } = req.body;

    try {
        const decode = jwt.verify(loginToken, process.env.JWT_SECRET);
        const userInfo = await Account.findOne({ email: decode.email });

        const updateData = {
            prevApprover: userInfo.approver,
            isApproved_requrement_1: checkedRequirements.checkedReq1,
            isApproved_requrement_2: checkedRequirements.checkedReq2,
            isApproved_requrement_3: checkedRequirements.checkedReq3,
            isApproved_requrement_4: checkedRequirements.checkedReq4,
            isApproved_requrement_5: checkedRequirements.checkedReq5,
            isApproved_requrement_6: checkedRequirements.checkedReq6,
            isApproved_requrement_7: checkedRequirements.checkedReq7,
            isApproved_requrement_8: checkedRequirements.checkedReq8,
            isApproved_requrement_9: checkedRequirements.checkedReq9,
            isApproved_requrement_10: checkedRequirements.checkedReq10,
        };



        if(decision === 'Approved') {
            updateData.approvedBy = { $concat: ['$approvedBy', userInfo.approver, ', '] };
            await ApplicationForms.updateOne({ _id: formID }, [{ $set: updateData }]);
            return res.json({ message: 'Succesfully Approved' });
        }

        if (decision === 'Declined') {
            updateData.declinedBy = userInfo.approver;
            updateData.status = decision;
            await ApplicationForms.updateOne({ _id: formID }, [{ $set: updateData }]);
            return res.json({ message: 'Declined Application' });
        }

        return res.json({ error: 'Invalid decision provided' });

    } catch (error) {
        console.error(`Checking Application Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


module.exports = {
    submitApplicationEntry,
    getRankRequirement,
    checkApplication,
}