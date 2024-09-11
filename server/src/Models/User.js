const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    employeeID: String,
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    middleName: String,
    gender: String,
    track: String,
    rank: String,
    position: String,
    department: String,
    profilePicture: {
        type: String,
        default: null
    }
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
