const mongoose = require('mongoose');
const { Schema } = mongoose;

const PreApply = new Schema({
    name: String,
    email: String,
    college: String,
    department: String,
    academicYear: String,
    currentRank: String,
    applyingFor: String,
    track: String,
    requirement_1: {
        type: String, 
        defualt: null
    },
    requirement_2: {
        type: String,
        default: null
    },
    requirement_3: {
        type: String, 
        default: null
    },  
    requirement_4: {
        type: String,
        default: null
    },
    requirement_5: {
        type: String,
        default: null
    },
    requirement_6: {
        type: String,
        default: null
    },
    requirement_7: {
        type: String,
        default: null
    },
    requirement_8: {
        type: String,
        default: null
    },
    requirement_9: {
        type: String,
        default: null
    },
    requirement_10: {
        type: String,
        default: null
    },
});

const PreApplyForReRanking = mongoose.model('userapplication', PreApply);

module.exports = PreApplyForReRanking;