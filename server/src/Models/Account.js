const mongoose = require('mongoose')
const { Schema } = mongoose

const AccountSchema = new Schema ({
    employeeID: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'faculty'
    },
    approver: {
        type: String,
        default: 'none'
    }
})

const AccountModel = mongoose.model('accounts', AccountSchema)

module.exports = AccountModel;