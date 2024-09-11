const Router = require('express');
const cors = require('cors');

const { register, verifyEmail, registerProfile, login, logout, forgotPassword, resetPassword} = require('../Controllers/AuthController');
const { getUserData, getRole, updateProfile, submitReport, getUserReports, getRankList, changePassword} = require('../Controllers/FacultyController');
const { getAllReports, createRank, getAllRanks, getApplicationsForReRanking} = require('../Controllers/AdminController');
const { submitApplicationEntry, getRankRequirement, checkApplication } = require('../Controllers/ApplicationController');

//middleware
const { authorizationMiddleware } = require('../Middleware/authorizationMiddleware');
const upload  = require('../Middleware/uploadMiddleware');
const router = Router();

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', (res, req) => res.send('tanginaaa gumana kanaaa'))

//login
router.post('/api/login', login);

//logout
router.get('/api/logout', logout);

//registration process
router.post('/api/register', register);
router.post('/api/registeProfile', registerProfile);

//email verification 
router.post('/api/verifyEmail', verifyEmail);

//forgot password process
router.post('/api/forgot', forgotPassword);
router.post('/api/resetpassword', resetPassword);

//edit profile
router.post('/api/updateprofile', updateProfile);
router.post('/api/changepassword', changePassword);

//user
router.post('/api/submitreport', authorizationMiddleware('faculty'), submitReport);
router.get('/api/getRankList', authorizationMiddleware('faculty'), getRankList);
router.get('/api/getreport', authorizationMiddleware('faculty'), getUserReports);
router.get('/api/getProfile', getUserData);
router.get('/api/getRole', getRole);
router.get('/api/getRequirement', getRankRequirement);

//admin 
router.get('/api/getAllReports', authorizationMiddleware('director'), getAllReports);
router.post('/api/createRank', authorizationMiddleware('director'), createRank);
router.get('/api/getAllRank', authorizationMiddleware('director'), getAllRanks);
router.get('/api/getApplications', authorizationMiddleware('director'), getApplicationsForReRanking);
router.post('/api/checkApplication', authorizationMiddleware('director'), checkApplication);


//Application for re-ranking
router.post('/api/submitApplicationEntry', authorizationMiddleware('faculty'), 
    upload.fields([{ name: 'requirement_1', maxCount: 1}, { name: 'requirement_2', maxCount: 1}, 
        { name: 'requirement_3', maxCount: 1}, { name: 'requirement_4', maxCount: 1 }, { name: 'requirement_5', maxCount: 1}, 
        { name: 'requirement_6', maxCount: 1}, { name: 'requirement_7', maxCount: 1 }, { name: 'requirement_8', maxCount: 1}, 
        { name: 'requirement_9', maxCount: 1}, { name: 'requirement_10', maxCount: 10}, 
    ]), 
    submitApplicationEntry
);

module.exports = router
