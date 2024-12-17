import mongoose from "mongoose";


// Group Model collection (Attributes)
const classSchema = new mongoose.Schema({
    classTime: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true,
        unique: true
    },

}, {
    timestamps: true
})



const Class = mongoose.model('Class', classSchema);
export default Class;
