import asyncHandler from "express-async-handler";
import Group from "../modals/groupModel.js";
import User from "../modals/userModal.js"

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
        res.status(400).json({ message: "Invalid Group data" })
    }
})


// Get all groups
const getGroups = asyncHandler(async (req, res) => {
    try {
        // Fetch groups and populate the 'members' field with only the 'name' field from the User schema
        const groups = await Group.find({})
            .populate('members', 'name'); // Populate with only 'name' and exclude '_id'

        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve groups', error: error.message });
    }
})

const editGroups = asyncHandler(async (req, res) => {
    const { id } = req.params; // Group ID from params
    const { scheduleTime, groupName, userIds, resources } = req.body; // Extract userIds

    // Find the group by ID
    const group = await Group.findById(id);

    if (group) {
        // Update scheduleTime and groupName if provided
        group.scheduleTime = scheduleTime || group.scheduleTime;
        group.groupName = groupName || group.groupName;
        group.resources = resources || group.resources;

        // Validate and add unique user IDs to members array
        if (userIds && Array.isArray(userIds)) {
            const validUserIds = await User.find({ _id: { $in: userIds } }).select('_id');
            validUserIds.forEach((validUserId) => {
                if (!group.members.includes(validUserId._id.toString())) {
                    group.members.push(validUserId._id);
                }
            });
        }

        // Save the updated group
        const updatedGroup = await group.save();
        console.log("Updated Group:", updatedGroup); // Debugging
        res.json(updatedGroup);
    } else {
        res.status(404).json({ status: "FAILED", message: "Group not found" });
    }
});


const getGroupCount = asyncHandler(async (req, res) => {
    try {
        const groupCount = await Group.countDocuments();
        res.status(200).json({ groupCount })
    } catch (error) {
        console.error("Error fetching group count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



const deleteGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (group) {
        await group.deleteOne();
        res.json({ message: 'Group removed' });
    } else {
        res.status(404).json({ status: "FAILED", message: "Group not found" });
    }
});


const saveFileUrl = asyncHandler(async (req, res) => {
    const { resources, groupId } = req.body;
    // console.log(req.body)

    let response = []
    for(const group of groupId){
    //    console.log(group)
        const groupData = await Group.findById(group)
        // console.log(groupData)
        
        if(groupData){
            groupData.resources = resources || groupData.resources;
           
            const updatedGroup = await groupData.save();
            response.push(updatedGroup)
        }
       

    }
    res.status(200).json(response)
});

export { createGroup, getGroups, editGroups, deleteGroup, saveFileUrl, getGroupCount }