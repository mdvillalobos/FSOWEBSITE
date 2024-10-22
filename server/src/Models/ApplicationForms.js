import mongoose from 'mongoose';
const { Schema } = mongoose;

const requirementSchema = new Schema({
    requirementNumber: {
        type: Number,
        default: null
    },
    isApproved: {
        type: String,
        default: null
    },
    filePath: {
        type: String,
        default: null
    },
    fileName: {
        type: String,
        default: null
    }
})

const ApplicationFormsSchema = new Schema({
    name: String,
    email: String,
    college: String,
    department: String,
    academicYear: String,
    currentRank: String,
    applyingFor: String,
    track: String,
    userStatus: String,
    purpose: String,
    requirements: [requirementSchema],
    prevApprover: {
        type: String,
        default: null
    },
    approvedBy: {
        type: String,
        default: ''
    },
    declinedBy: {
        type: String,
        default: null
    },
    applicationStatus: { 
        type: String,
        default: 'For approval'
    }
})

const ApplicationForm = mongoose.model('applicationForms', ApplicationFormsSchema);

export default ApplicationForm;