import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import ApplicationForms from '../Models/ApplicationForms.js';

import { filterAndUploadedRequirements } from '../Helpers/Cloudinary.js';

export const checkUserEntry = async (req, res) => {
    const { token } = req.cookies;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userEntry = await ApplicationForms.findOne({ email: email, purpose: 'application' });
        return res.json(userEntry)
        
    }
    catch (error) {
        console.error(`Fetching User Entry Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const submitApplicationEntry = async (req, res) => {
    const { token } = req.cookies;
    const { name, college, department, currentRank, academicYear, ApplyingFor, userTrack, purpose } = req.body;

    if(!name || !college || !department || !currentRank || !academicYear || !ApplyingFor || !userTrack) {
        return res.json({ error: 'Required all fields.'})
    }

    const folderPath = (purpose === 'application') ? 'requirements' : (purpose === 'repository' ? 'repository' : null);

    if (!folderPath) {
        return res.json({ error: 'Invalid process type.' });
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const requirements = await filterAndUploadedRequirements(req.files, folderPath)
        if(requirements) {
            const dataToProcess = {
                name,
                email,
                college,
                department,
                currentRank,
                academicYear,
                applyingFor: ApplyingFor,
                track: userTrack,
                userStatus: 'professor',
                purpose: purpose,
                requirements: requirements
            };
    
            await ApplicationForms.create(dataToProcess);
            return res.json({ message: 'Success'});
        }

        return res.json({ error: "There's an error at the moment please try again later!"})

    } catch (error) {
        console.log( error );
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const checkApplication = async (req, res) => {
    const { token } = req.cookies;
    const { formID, decision, remarks, ...checkedReq } = req.body;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const [ userInfo, userApplicationForm ] = await Promise.all([
            Account.findOne({ email }),
            ApplicationForms.findById(formID)
        ]);

        userApplicationForm.requirements.forEach((requirement) => {
            requirement.isApproved =  checkedReq[`checkedReq${requirement.requirementNumber}`];
        });

        userApplicationForm.applicationStatus = decision;

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

export const countData = async (req, res) => {
    try {
        const applications = await ApplicationForms.find({ purpose: 'application', applicationStatus: { $ne: 'For approval' }});

        console.log(applications)
        const countIsApproved = {};
        const applicationStatus = {
            approved: 0,
            declined: 0
        }

        applications.forEach(applicationData => {
            const rankName = applicationData.applyingFor;

            if (applicationData.applicationStatus === 'Approved') {
                applicationStatus.approved++;
            } else if (applicationData.applicationStatus === 'Declined') {
                applicationStatus.declined++;
            }

            if (!countIsApproved[rankName]) {
                countIsApproved[rankName] = {
                    rankName: rankName,
                    requirementsCount: []
                };
            }

            applicationData.requirements.forEach((requirementData, i) => {
                if (!countIsApproved[rankName].requirementsCount[i]) {
                    countIsApproved[rankName].requirementsCount[i] = {
                        declined: 0,
                        approved: 0
                    };
                }

                if (requirementData.isApproved === 'Declined') {
                    countIsApproved[rankName].requirementsCount[i].declined++;
                } else if (requirementData.isApproved === 'Approved') {
                    countIsApproved[rankName].requirementsCount[i].approved++;
                }
            });
        });

        const dataOfIsApproved = Object.values(countIsApproved);
        return res.json({ isApprovedData: dataOfIsApproved, statusData: applicationStatus })

    }
    catch (error) {
        console.error(`Fetching Data Analytics isApproved Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}
