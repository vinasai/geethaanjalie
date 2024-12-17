import asyncHandler from "express-async-handler";
import Group from "../modals/groupModel.js";


// Create a new group
const createGroup = asyncHandler(async (req, res) => {
    const {
        scheduleTime,
        groupName
    } = req.body;


    const group = await Group.create({
        scheduleTime,
        groupName
    })

    if (group) {
        res.status(201).json(group)
    } else {
        res.status(400).json({message: "Invalid Group data"})
    }
})


// Get all groups
const getGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find({});
    res.status(200).json(groups)
})

const editGroups = asyncHandler(async (req, res) => {
    let _id = req.params.id
    const group = await Group.findById(_id);
    if (group) {
        group.scheduleTime = req.body.scheduleTime || group.scheduleTime;
        group.groupName = req.body.groupName || group.groupName;


        const editGroups = await group.save();
        res.json(editGroups);
    } else {
        res.status(404).json({status: "FAILED", message: "Group not found"});

    }
})

const deleteGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (group) {
        await group.deleteOne();
        res.json({message: 'Group removed'});
    } else {
        res.status(404).json({status: "FAILED", message: "Group not found"});
    }
})

export {createGroup,getGroups, editGroups, deleteGroup}