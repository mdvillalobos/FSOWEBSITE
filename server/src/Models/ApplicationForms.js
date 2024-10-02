const mongoose = require('mongoose')
const { Schema } = mongoose

const ApplicationFormsSchema = new Schema({
    name: String,
    email: String,
    college: String,
    department: String,
    academicYear: String,
    currentRank: String,
    applyingFor: String,
    track: String,
    requirement_1: String,
    isApproved_requrement_1: {
        type: String,
        default: null
    },
    requirement_2: String,
    isApproved_requrement_2: {
        type: String,
        default: null
    },
    requirement_3: String,
    isApproved_requrement_3: {
        type: String,
        default: null
    },    
    requirement_4: {
        type: String,
        default: null
    },
    isApproved_requrement_4: {
        type: String,
        default: null
    },
    requirement_5: {
        type: String,
        default: null
    },
    isApproved_requrement_5: {
        type: String,
        default: null
    },
    requirement_6: {
        type: String,
        default: null
    },
    isApproved_requrement_6: {
        type: String,
        default: null
    },
    requirement_7: {
        type: String,
        default: null
    },
    isApproved_requrement_7: {
        type: String,
        default: null
    },
    requirement_8: {
        type: String,
        default: null
    },
    isApproved_requrement_8: {
        type: String,
        default: null
    },
    requirement_9: {
        type: String,
        default: null
    },
    isApproved_requrement_9: {
        type: String,
        default: null
    },
    requirement_10: {
        type: String,
        default: null
    },
    isApproved_requrement_10: {
        type: String,
        default: null
    },
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