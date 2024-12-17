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

}, {
    timestamps: true
})



const Group = mongoose.model('Group', groupSchema);
export default Group;
