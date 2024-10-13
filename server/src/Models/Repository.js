import mongoose from 'mongoose';
const { Schema } = mongoose;

const requirementSchema = new Schema({
    requirementNumber: {
        type: Number,
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

const RepositorySchema = new Schema({
    name: String,
    email: String,
    college: String,
    department: String,
    academicYear: String,
    currentRank: String,
    applyingFor: String,
    track: String,
    requirements: [requirementSchema],
})

const Repository = mongoose.model('repository', RepositorySchema);

export default Repository;