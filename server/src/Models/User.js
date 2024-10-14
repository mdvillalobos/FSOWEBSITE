import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    employeeID: String,
    email: {
        type: String,
        unique: true
    },
    approver: {
        type: String,
        default: null,
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
    }
})

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
