import asyncHandler from "express-async-handler";
import Group from "../modals/groupModel.js";
import User from "../modals/userModal.js"

// Create a new group
const createGroup = asyncHandler(async (req, res) => {
    const {
        day,
        scheduleTime,
        groupName,
        
    } = req.body;
    console.log(req.body); // Debugging

    const group = await Group.create({
        day,
        scheduleTime,
        groupName,
        
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
    try {
        const { id } = req.params;
        const { scheduleTime, groupName, userIds, resources, day } = req.body;

        // Find the group
        const group = await Group.findById(id);
        if (!group) {
            return res.status(404).json({ status: "FAILED", message: "Group not found" });
        }

        // Update fields
        group.day = day || group.day;
        group.scheduleTime = scheduleTime || group.scheduleTime;
        group.groupName = groupName || group.groupName;
        group.resources = resources || group.resources;

        // Validate and update members list
        if (userIds && Array.isArray(userIds)) {
            const validUserIds = await User.find({ _id: { $in: userIds } }).select('_id');
            
            const newMembers = validUserIds.map(user => user._id);

            // Force update by replacing the array
            group.members = newMembers;
            group.markModified('members');  // Ensure Mongoose detects the change
        }

        // Save the updated group
        const updatedGroup = await group.save();


        res.json(updatedGroup);
    } catch (error) {
        console.error("Error updating group:", error);
        res.status(500).json({ status: "FAILED", message: "Internal Server Error" });
    }
});

const getGroupCount = async (req, res) => {
    try {
      const groups = await Group.aggregate([
        {
          $lookup: {
            from: 'students', // Assuming the students are in a 'students' collection
            localField: '_id',
            foreignField: 'groupId', // Assuming each student has a 'groupId' field
            as: 'students'
          }
        },
        {
          $project: {
            groupName: 1, // You can include other fields if needed
            totalStudents: { $size: '$students' } // Get the number of students in the group
          }
        }
      ]);
      res.json(groups);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  


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
    
    let response = [];
    
    for (const group of groupId) {
        const groupData = await Group.findById(group);
        
        if (groupData) {
            // Assuming resources is an array, append the new resources to the existing ones
            groupData.resources = [...groupData.resources, ...resources]; // Merge the resources
            
            const updatedGroup = await groupData.save();
            response.push(updatedGroup);
        }
    }
    
    res.status(200).json(response);
});



const getGroupsWithStudentCount = async (req, res) => {
    try {
        // Fetch all groups, including the member count
        const groups = await Group.aggregate([
            {
                $lookup: {
                    from: "users",  // Assuming 'users' is the collection name for users
                    localField: "members", // The field in the group model
                    foreignField: "_id", // The field in the user model
                    as: "membersInfo" // The result of the join
                }
            },
            {
                $addFields: {
                    studentCount: { $size: "$membersInfo" } // Add a field for the number of members
                }
            },
            {
                $project: {
                    groupName: 1,
                    scheduleTime: 1,
                    day: 1,
                    studentCount: 1,  // Include the student count in the response
                }
            }
        ]);

        res.status(200).json(groups);  // Send the groups data with student count
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get groups data" });
    }
};

export { createGroup, getGroups, getGroupsWithStudentCount,editGroups, deleteGroup, saveFileUrl, getGroupCount }