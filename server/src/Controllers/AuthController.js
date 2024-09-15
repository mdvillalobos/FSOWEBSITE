require('dotenv').config();

const jwt = require('jsonwebtoken');
const validator = require('validator');

const Account = require('../Models/Account');
const User = require('../Models/User');
const EmailVerification = require('../Models/VerificationToken');

const { sendEmailVerification } = require('../Helpers/SendEmail')
const { hashPassword, comparePassword } = require('../Helpers/Auth');

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
            return res.json({
                error: 'Required up all fields'
            })
        }

        const user = await Account.findOne({email});
        if(!user) {
            return res.json({
                error: 'Incorrect Email or Password'
            })
        }

        const isPasswordMatched = await comparePassword(password, user.password);
        if(!isPasswordMatched) {
            return res.json({
                error: 'Incorrect Email or Password'
            })
        }

        if(isPasswordMatched) {
            const userData = await User.findOne({email: user.email})
            jwt.sign({email: user.email, role: user.role}, process.env.JWT_SECRET, {}, (err, loginToken) => {
                if(err) throw err;
                res.cookie('loginToken', loginToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' }).json({user: userData, role: user.role})
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    const {employeeID, email, password} = req.body;
    
    try {
        if(!employeeID || !email || !password) {
            return res.json({
                error: 'Required All Fields.'
            })
        }

        if(!validator.isEmail(email)) {
            return res.json({
                error: 'Email is not valid!'
            })
        };

        if(!validator.isStrongPassword(password)) {
            return res.json({
                error: 'The Password must contain one uppercase, one lowercase and a number'
            })
        }

        const isEmailExist = await Account.findOne({email});
        if(isEmailExist) {
            return res.json({
                error: 'Email already existed'
            })
        };

        const hashedPassword = await hashPassword(password);
        const userAccount = await Account.create({
            employeeID,  
            email, 
            password: hashedPassword,
        });

        if (userAccount) {
            sendEmailVerification(userAccount.email);
            jwt.sign({email: userAccount.email, employeeID: userAccount.employeeID}, process.env.JWT_SECRET, {}, (err, verificationToken) => {
                if(err) throw err;
                res.cookie('verificationToken', verificationToken, { httpOnly: true }).json({email: userAccount.email})
            }) 
        }

        else {
            return res.json({
                error: 'There is an error at the moment. Pleas try again later.'
            })
        }

    } catch (error) {
        console.log(error);
    }
}

const verifyEmail = async (req,res) => {
    const {verificationToken} = req.cookies
    const {otp} = req.body 

    try {
        if(!otp) {
            return res.json({
                error: 'Please Enter your One Time Pin'
            })
        }

        const decode = jwt.verify(verificationToken, process.env.JWT_SECRET);
        if(decode) {
            const userOTP = await EmailVerification.findOne({owner: decode.email});

            if(userOTP) {
                const isOTPCorrect = await comparePassword(otp, userOTP.Otp);
                if(!isOTPCorrect) {
                    return res.json({
                        error: 'Incorrect One-Time-Pin!'
                    })
                }
    
                await EmailVerification.findOneAndDelete({owner: decode.email})
                return res.json(otp);
            }

            return res.json({
                error: 'There is an error at the moment please try again later'
            })
        
        }

    } catch (error) {
        console.log(error);
    }
}

const registerProfile = async (req, res) => {
    const{verificationToken} = req.cookies;
    let {employeeID, email, firstName, lastName, middleName, track, rank, position, department} = req.body;

    try {
        
        if(!firstName || !lastName || !track || !rank || !position || !department) {
            return res.json({
                error: 'Required All Fields'
            })
        }

        const token = jwt.verify(verificationToken, process.env.JWT_SECRET);

        if(token) {
            employeeID = token.employeeID;
            email = token.email;

            const userDetails = await User.create({
                employeeID,
                email,
                firstName,
                lastName,
                middleName,
                track,
                rank,
                position,
                department,
            })

            if(userDetails) {
                res.clearCookie('verificationToken');
                jwt.sign({email: email}, process.env.JWT_SECRET, {}, (err, loginToken) => {
                    if(err) throw err;
                    res.cookie('loginToken', loginToken, { httpOnly: true }).json({email: email})
                }) 
            }

            else {
                return res.json({
                    error: 'There is a problem at the moment please try again later'
                })
            }
        }

        else {
            return res.json({
                error: 'Required Token'
            })
        }
        
    } catch (error) {
        console.log(error);
    }
}


const forgotPassword = async (req, res) => {
    const {email} = req.body

    try {
        if(!email) {
            return res.json({
                error: 'Please Enter your email'
            })
        }
        const user = await Account.findOne({email})

        if(!user) {
            return res.json({
                error: "Email Doesn't Exist!"
            })
        }
        else {
            sendEmailVerification(user.email);
            jwt.sign({email: user.email}, process.env.JWT_SECRET, {}, (err, verificationToken) => {
                if(err) throw err;
                res.cookie('verificationToken', verificationToken, { httpOnly: true }).json({email: user.email})
            }) 
        }
    
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const {password , confirmPassword} = req.body
    const {verificationToken} = req.cookies;

    try {
        if(!password || !confirmPassword) {
            res.json({
                error: 'Fill up all fields'
            })
        }
        if(verificationToken) {
            if(!validator.isStrongPassword(password) ) {
                return res.json({
                    error: 'Password Must Contain One Uppercase, One Lowercase. One Number and One Special Character.'
                })
            }
    
            if(password != confirmPassword) {
                return res.json({
                    error: "Confirm password not matched"
                })
            }

            const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET)
            const hashedPassword = await hashPassword(password)
            await Account.findOneAndUpdate({email: decoded.email}, {password: hashedPassword})
            res.clearCookie('otpToken');
            return res.json({
                message: 'Password Change Successfully'
            }) 
        }

        return res.json({
            error: "There's a problem at the moment please try again later"
        })

    } catch (error) {
        console.log(error)
    }
}

const logout = (req, res) => {
    res.clearCookie('loginToken');
    return res.json({Status: "success"})
}


module.exports = {
    register,
    verifyEmail,
    registerProfile,
    login,
    logout,
    forgotPassword,
    resetPassword, 
}