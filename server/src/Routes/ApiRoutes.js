import { Router } from 'express';
const router = Router();

import { login, register, verifyEmail, registerProfile, forgotPassword, resetPassword, logout, resendOTP } from '../Controllers/AuthController.js';
import { getUserData, addEducation, addSeminar, addAchievement, getUserCredentials, getUserReports, submitReport } from '../Controllers/UserController.js';
import { getUserRepository, getUserFileInRepository, updateRepository, deleteRepository } from '../Controllers/Repository.js';
import { changePassword, updateName,  updateOtherInfo, updateProfilePicture } from '../Controllers/SettingController.js'
import { getAllReports, updateConfig, getConfigurations, getRanks, createRank, getAllApprovers, getApplicationsForReRanking } from '../Controllers/AdminController.js';
import { checkUserEntry, submitApplicationEntry, checkApplication , countData } from '../Controllers/ApplicationController.js';

import authorizationMiddleware from '../Middleware/authorizationMiddleware.js';
import { upload, multerErrorHandler } from'../Middleware/uploadMiddleware.js';

const uploadFiles = upload.fields([{ name: 'requirement_1', maxCount: 1}, { name: 'requirement_2', maxCount: 1}, 
    { name: 'requirement_3', maxCount: 1}, { name: 'requirement_4', maxCount: 1 }, { name: 'requirement_5', maxCount: 1}, 
    { name: 'requirement_6', maxCount: 1}, { name: 'requirement_7', maxCount: 1 }, { name: 'requirement_8', maxCount: 1}, 
    { name: 'requirement_9', maxCount: 1}, { name: 'requirement_10', maxCount: 1}, 
]);

// login & logout
router.post('/api/login', login);
router.post('/api/logout', logout);

//registration process
router.post('/api/register', register);
router.post('/api/registeProfile', upload.single('profilePicture'), registerProfile);

//email verification 
router.post('/api/verifyEmail', verifyEmail);
router.post('/api/resendOTP', resendOTP);

//forgot password process
router.post('/api/forgot', forgotPassword);
router.post('/api/resetpassword', resetPassword);

//edit profile
router.post('/api/updatename', updateName);
router.post('/api/updateotherinfo' , updateOtherInfo);
router.post('/api/updateProfilePicture', upload.single('profilePicture'), updateProfilePicture);
router.post('/api/changepassword', changePassword);

//user
//profile
router.get('/api/getProfile', getUserData);
router.post('/api/addEducation', addEducation);
router.post('/api/addSeminar', addSeminar);
router.post('/api/addAchievement', addAchievement);
router.get('/api/getUserCredentials', getUserCredentials);

//repository
router.get('/api/getUserRepository', authorizationMiddleware('user'), getUserRepository);
router.post('/api/updateRepository', authorizationMiddleware('user'), uploadFiles, updateRepository);
router.post('/api/deleteRepository', authorizationMiddleware('user'), deleteRepository);
router.get('/api/getUserFileInRepo', authorizationMiddleware('user'), getUserFileInRepository);

//reports
router.post('/api/submitreport', authorizationMiddleware('user'), submitReport);
router.get('/api/getreport', authorizationMiddleware('user'), getUserReports);

//Application for re-ranking
router.get('/api/getEntry', authorizationMiddleware('user'), checkUserEntry);
router.get('/api/getAllRank', getRanks);

//admin 
router.get('/api/getAllReports', authorizationMiddleware('admin'), getAllReports);
router.get('/api/getapprovers', authorizationMiddleware('admin'), getAllApprovers);
router.get('/api/getApplications', authorizationMiddleware('admin'), getApplicationsForReRanking);
router.post('/api/createRank', authorizationMiddleware('admin'), createRank);
router.post('/api/checkApplication', authorizationMiddleware('admin'), checkApplication);
router.get('/api/getDataAnalytics', authorizationMiddleware('admin'), countData);
router.post('/api/updateConfig', authorizationMiddleware('admin'), updateConfig)
router.get('/api/getConfiguration', authorizationMiddleware('admin'), getConfigurations)

router.post('/api/submitApplicationEntry',uploadFiles, multerErrorHandler, submitApplicationEntry);

export default router
