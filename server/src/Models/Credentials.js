import mongoose from 'mongoose';
const { Schema } = mongoose;

const EducationSchema = new Schema({
    level: String,
    schoolName: String,
    address: String,
    yearGraduated: String,
});

const SeminarSchema = new Schema({
    seminarName: String,
    date: String,
});

const AchievementSchema = new Schema({
    achievementName: String,
    date: String
})

const CredentialsSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    about: {
        type: String,
        default: null
    },
    educations: [EducationSchema],
    seminars: [SeminarSchema],
    achievements: [AchievementSchema],
    
})

const CredentialModel = mongoose.model('credentials', CredentialsSchema);

export default CredentialModel;
