require('dotenv').config();
const jwt = require('jsonwebtoken');
const ApplicationForms = require('../Models/ApplicationForms');
const Ranks = require('../Models/Ranks');
const Account = require('../Models/Account');
const CloudinaryUpload = require('../Helpers/Cloudinary');

const getRanks = async (req, res) => {
    const { loginToken } = req.cookies;

    if(!loginToken) {
        return res.json({ error: 'Access denied!' });
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

const filterAndUploadedRequirements = async (files) => {
    const userSubmittedRequirements = Object.values(files).map(file => file[0].path); 
    
    const uploadPromises = userSubmittedRequirements.map(path => CloudinaryUpload(path, 'requirements', { concurrent: true }));
    const uploadResponses = await Promise.all(uploadPromises);
    
    return uploadResponses.map((response, i) => ({
        requirementNumber: i + 1,
        imagePath: response.secure_url,
    }))
}

const submitApplicationEntry = async (req, res) => {
    const { loginToken } = req.cookies;
    const { name, college, department, currentRank, academicYear, ApplyingFor, userTrack } = req.body;

    if(!name || !college || !department || !currentRank || !academicYear || !ApplyingFor || !userTrack) {
        return res.json({ error: 'Required all fields.'})
    }

    try {
        const requirements = await filterAndUploadedRequirements(req.files)
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

        return res.json({ message: 'Success'});

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
        const [ userInfo, userApplicationForm ] = await Promise.all([
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

const countDeclinedApplicationRequirements = async (req, res) => {

    try {
        const application = await ApplicationForms.find()
        const declinedCount = {};

        application.forEach(applicationData => {
            const rankName = applicationData.applyingFor;

            if(!declinedCount[rankName]) {
                declinedCount[rankName] = {}
                declinedCount[rankName]['rankName'] = rankName
            }

            applicationData.requirements.forEach((requirementData, i) => {
                if(!declinedCount[rankName]['requirementsCount']) {
                    declinedCount[rankName]['requirementsCount'] = []
                }

                if(!declinedCount[rankName]['requirementsCount'][i]) {
                    declinedCount[rankName]['requirementsCount'][i] = {};
                }

                if(!declinedCount[rankName]['requirementsCount'][i]['declined']) {
                    declinedCount[rankName]['requirementsCount'][i]['declined'] = 0;
                }

                if(!declinedCount[rankName]['requirementsCount'][i]['approved']) {
                    declinedCount[rankName]['requirementsCount'][i]['approved'] = 0;
                }
                
                if(requirementData.isApproved === 'Declined') { 
                   declinedCount[rankName]['requirementsCount'][i]['declined']++;
                }

                if(requirementData.isApproved === 'Approved') {
                    declinedCount[rankName]['requirementsCount'][i]['approved']++;
                }
            })
        })
        const result = Object.values(declinedCount).map(obj => {
            return { ...obj };
        });
        return res.json(result)
    }
    catch (error) {
        console.error(`Fetching Data Analytics Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}


module.exports = {
    getRanks,
    submitApplicationEntry,
    checkApplication,
    countDeclinedApplicationRequirements
}