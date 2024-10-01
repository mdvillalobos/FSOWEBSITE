const Router = require('express');
const router = Router();

const { login, register, verifyEmail, registerProfile, forgotPassword, resetPassword, logout, resendOTP} = require('../Controllers/AuthController');
const { getUserData, getRole, updateProfile, submitReport, getUserReports, getRankList, changePassword} = require('../Controllers/UserController');
const { getAllReports, createRank, getAllRanks, getApplicationsForReRanking} = require('../Controllers/AdminController');
const { submitApplicationEntry, getRankRequirement, checkApplication } = require('../Controllers/ApplicationController');

//middleware functionalities
const { authorizationMiddleware } = require('../Middleware/authorizationMiddleware');
const { upload, multerErrorHandler }  = require('../Middleware/uploadMiddleware');

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
router.post('/api/submitreport', authorizationMiddleware('faculty'), submitReport);
router.get('/api/getreport', authorizationMiddleware('faculty'), getUserReports);
router.get('/api/getRankList', authorizationMiddleware('faculty'), getRankList);
router.get('/api/getProfile', getUserData);
router.get('/api/getRole', getRole);
router.get('/api/getRequirement', getRankRequirement);

//admin 
router.get('/api/getAllReports', authorizationMiddleware('director'), getAllReports);
router.get('/api/getAllRank', authorizationMiddleware('director'), getAllRanks);
router.post('/api/createRank', authorizationMiddleware('director'), createRank);
router.get('/api/getApplications', authorizationMiddleware('director'), getApplicationsForReRanking);
router.post('/api/checkApplication', authorizationMiddleware('director'), checkApplication);

//Application for re-ranking
const uploadFiles = upload.fields([{ name: 'requirement_1', maxCount: 1}, { name: 'requirement_2', maxCount: 1}, 
    { name: 'requirement_3', maxCount: 1}, { name: 'requirement_4', maxCount: 1 }, { name: 'requirement_5', maxCount: 1}, 
    { name: 'requirement_6', maxCount: 1}, { name: 'requirement_7', maxCount: 1 }, { name: 'requirement_8', maxCount: 1}, 
    { name: 'requirement_9', maxCount: 1}, { name: 'requirement_10', maxCount: 1}, 
]);

router.post('/api/submitApplicationEntry',uploadFiles, multerErrorHandler, submitApplicationEntry,);

module.exports = router
