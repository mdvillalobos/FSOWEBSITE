import { Router } from 'express';
const router = Router();

import { login, register, verifyEmail, registerProfile, forgotPassword, resetPassword, logout, resendOTP } from '../Controllers/AuthController.js';
import { getUserData, getRole, getUserRepository, updateRepository, getUserReports, submitReport, changePassword, updateProfile,  updateProfilePicture } from '../Controllers/UserController.js';
import { getAllReports, getAllApprovers, createRank, getApplicationsForReRanking } from '../Controllers/AdminController.js';
import { submitApplicationEntry, getRanks, checkApplication , countData } from '../Controllers/ApplicationController.js';

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
router.post('/api/registeProfile', registerProfile);

//email verification 
router.post('/api/verifyEmail', verifyEmail);
router.post('/api/resendOTP', resendOTP);

//forgot password process
router.post('/api/forgot', forgotPassword);
router.post('/api/resetpassword', resetPassword);

//edit profile
router.post('/api/updateprofile', updateProfile);
router.post('/api/changepassword', changePassword);

//user
router.post('/api/updateProfilePicture', upload.single('profilePicture'), updateProfilePicture);
router.get('/api/getUserRepository', authorizationMiddleware('user'), getUserRepository);
router.post('/api/updateRepository', authorizationMiddleware('user'), uploadFiles, updateRepository);
router.post('/api/submitreport', authorizationMiddleware('user'), submitReport);
router.get('/api/getreport', uploadFiles, getUserReports);
router.get('/api/getProfile', getUserData);
router.get('/api/getRole', getRole);
router.get('/api/getAllRank', getRanks);

//admin 
router.get('/api/getAllReports', authorizationMiddleware('admin'), getAllReports);
router.get('/api/getAllApprovers', authorizationMiddleware('admin'), getAllApprovers);
router.get('/api/getApplications', authorizationMiddleware('admin'), getApplicationsForReRanking);
router.post('/api/createRank', authorizationMiddleware('admin'), createRank);
router.post('/api/checkApplication', authorizationMiddleware('admin'), checkApplication);
router.get('/api/getDataAnalytics', authorizationMiddleware('admin'), countData);

router.post('/api/submitApplicationEntry',uploadFiles, multerErrorHandler, submitApplicationEntry);

export default router
