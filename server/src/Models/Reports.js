const mongoose = require('mongoose')
const { Schema } = mongoose

const ReportSchema = new Schema({
    email: String,
    subject: String, 
    message: String,
    date: String,
})

const ReportModel = mongoose.model('reports', ReportSchema);

module.exports = ReportModel;