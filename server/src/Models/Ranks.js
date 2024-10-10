import mongoose from 'mongoose';
const { Schema } = mongoose;

const RequirementSchema = new Schema({
    requirementNumber: Number,
    requirement: String
});

const RankSchema = new Schema ({
    rankName: String,
    track: String,
    requirements: [RequirementSchema]
});

const RankModel = mongoose.model('rank', RankSchema)

export default RankModel;