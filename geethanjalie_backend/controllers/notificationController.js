import asyncHandler from "express-async-handler";
import Notification from "../modals/notificationModals.js"

// Create a new group
const createNotification = asyncHandler(async (req, res) => {
    const {
        studentId,
        message
    } = req.body;


    const notification = await Notification.create({
        message,
        studentId
    })

    if (notification) {
        res.status(201).json(notification)
    } else {
        res.status(400).json({message: "Invalid Notification data"})
    }
})


// Get all groups
const getNotification = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({});
    res.status(200).json(notifications)
})





export {createNotification, getNotification}