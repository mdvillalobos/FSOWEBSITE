import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    employeeID: String,
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    middleName: String,
    sex: String,
    track: String,
    rank: String,
    department: String,
    position: String,
    profilePicture: {
        type: String,
        default: null
    },
    approver: {
        type: String,
        default: null,
    }
})

const UserModel = mongoose.model('userdata', UserSchema);

export default UserModel;
