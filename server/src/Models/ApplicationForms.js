const mongoose = require('mongoose')
const { Schema } = mongoose

const requirementSchema = new Schema({
    requirementNumber: {
        type: Number,
        default: null
    },
    isApproved: {
        type: String,
        default: null
    },
    imagePath: {
        type: String,
        default: null
    },
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
    status: {
        type: String,
        default: 'For Approval'
    },
})

const ApplicationForm = mongoose.model('applicationForms', ApplicationFormsSchema);

module.exports = ApplicationForm;