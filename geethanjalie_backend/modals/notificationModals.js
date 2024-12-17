import mongoose from "mongoose";


// Group Model collection (Attributes)
const notificationSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
})



const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
