import mongoose from 'mongoose';
const { Schema } = mongoose;

const AccountSchema = new Schema ({
    employeeID: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'user'
    },
})

const AccountModel = mongoose.model('accounts', AccountSchema)

export default AccountModel;