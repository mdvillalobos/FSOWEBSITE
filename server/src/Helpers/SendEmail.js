const nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require('bcrypt');
const EmailVerification = require('../Models/VerificationToken');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    }
});

const sendEmailVerification = async (email) => {
    try {
        const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
        console.log(otp)
        console.log(email)
        const HashedOTP = await bcrypt.hash(otp, 12);
        const userRecord = await EmailVerification.findOne({owner: email});

        if(!userRecord) {
            await EmailVerification.create({
                owner: email,
                Otp: HashedOTP
            })
        }
        
        else {
            await EmailVerification.updateOne({owner: email}, {Otp: HashedOTP})
        }

        await transporter.sendMail({
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: 'Email Verification',
            text: `Your one time pin is: ${otp}`, 
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendEmailVerification,

}

