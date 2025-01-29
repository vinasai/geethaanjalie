import asyncHandler from "express-async-handler";
import Group from "../modals/groupModel"

const saveFileUrl = asyncHandler(async (req, res) => {
    const { fileUrl, fileName, groupId } = req.body;

    if (!fileUrl || !fileName || !groupId) {
        res.status(400).json({ message: "File URL, file name, and group ID are required" });
        return;
    }

    // Verify the group exists
    const group = await Group.findById(groupId);
    if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
    }

    // Save the file information in the database
    const uploadedFile = await UploadFile.create({
        fileName,
        fileUrl,
        group: groupId,
    });

    if (uploadedFile) {
        res.status(201).json({
            message: "File URL saved successfully",
            uploadedFile,
        });
    } else {
        res.status(400).json({ message: "Failed to save file URL" });
    }
});



export {saveFileUrl};