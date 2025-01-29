import mongoose from "mongoose";


// Group Model collection (Attributes)
const groupSchema = new mongoose.Schema({
    scheduleTime: {
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: true,
        unique: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Refers to the User model
    }],
    resources: [{
        fileName: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        }
    }]


}, {
    timestamps: true
})



const Group = mongoose.model('Group', groupSchema);
export default Group;
