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

const filterAndUploadRequirements = async (files) => {
    const userSubmittedRequirements = Object.values(files).map(file => file?.[0]?.path)
    
    const uploadPromises = userSubmittedRequirements.map(path => CloudinaryUpload(path, 'requirements', { concurrent: true }));
    const uploadResponses = await Promise.all(uploadPromises);
    
    return uploadResponses.map((response, i) => ({
        requirementNumber: i + 1,
        imagePath: response.secure_url,
    }));
};

const submitApplicationEntry = async (req, res) => {
    const start = Date.now();
    const { loginToken } = req.cookies;
    const { name, college, department, currentRank, academicYear, ApplyingFor, userTrack } = req.body;

    if(!name || !college || !department || !currentRank || !academicYear || !ApplyingFor || !userTrack) {
        return res.json({ error: 'Required all fields.'})
    }

    try {
        const requirements = await filterAndUploadRequirements(req.files)
        const { email } = jwt.verify(loginToken, process.env.JWT_SECRET);
        await ApplicationForms.create({
            name: name,
            email: email,
            college: college,
            department: department,
            currentRank: currentRank,
            academicYear: academicYear,
            applyingFor: ApplyingFor,
            track: userTrack,
            requirements
        });
        
        console.log(`Estimated Time of Process: ${ Date.now() - start}`);
        return res.json('Success');

    } catch (error) {
        console.error(`Submiiton Of Application For Re-Ranking Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const checkApplication = async (req, res) => {
    const { loginToken } = req.cookies;
    const { formID, decision, ...checkedReq } = req.body;

    try {
        const { email } = jwt.verify(loginToken, process.env.JWT_SECRET);
        const [userInfo, userApplicationForm] = await Promise.all([
            Account.findOne({ email }),
            ApplicationForms.findById(formID)
        ]);

        userApplicationForm.requirements.forEach((requirement) => {
            requirement.isApproved =  checkedReq[`checkedReq${requirement.requirementNumber}`];
        });

        userApplicationForm.status = decision;

        if(decision === 'Approved') {
            userApplicationForm.prevApprover = userInfo.approver
            userApplicationForm.approvedBy = userApplicationForm.approvedBy
                ? `${ userApplicationForm.approvedBy }, ${ userInfo.approver }`
                : userInfo.approver;
            await userApplicationForm.save();
            return res.json({ message: 'Succesfully Approved' });
        }

        if (decision === 'Declined') {
            userApplicationForm.declinedBy = userInfo.approver;
            await userApplicationForm.save();
            return res.json({ message: 'Declined Application' });
        }

        return res.json({ error: 'Invalid decision!' });

    } catch (error) {
        console.error(`Checking Application Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


const createPreApplication = async (req, res) => {
    const { loginToken } = req.cookies;
    const { name, college, department, currentRank, academicYear, ApplyingFor, userTrack } = req.body;

    if(!name || !college || !department || !currentRank || !academicYear || !ApplyingFor || !userTrack) {
        return res.json({ error: 'Required all fields.'})
    }

    try {
        const userSubmittedRequirements = Object.values(req.files)
            .map((file, i) => file?.[0]?.path || null)
            .filter(path => path !== null)

        const uploadPromises = userSubmittedRequirements.map((path, i) => CloudinaryUpload(path, 'PreApplyFiles', { concurrent: true }));
        const uploadToCloudinary = await Promise.all(uploadPromises);

        const { email } = jwt.verify(loginToken, process.env.JWT_SECRET);
        await ApplicationForms.create({
            name: name,
            email: email,
            college: college,
            department: department,
            currentRank: currentRank,
            academicYear: academicYear,
            applyingFor: ApplyingFor,
            track: userTrack,
            ...Object.fromEntries(uploadToCloudinary.map((response, i) => [`requirement_${i + 1}`, response.secure_url]))
        });
        
        console.log(`Estimated Time of Process: ${ Date.now() - start}`);
        return res.json('Success');

    } catch (error) {
        console.error(`Submiiton Of Pre-Application For Re-Ranking Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


module.exports = {
    submitApplicationEntry,
    getRankRequirement,
    checkApplication,
}