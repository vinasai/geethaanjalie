import asyncHandler from "express-async-handler";
import Class from "../modals/classModel.js";


// Create a new class
const createClass = asyncHandler(async (req, res) => {
    const {
        classTime,
        className
    } = req.body;



    const classes = await Class.create({
        classTime,
        className
    })

    if (classes) {
        res.status(201).json(classes)
    } else {
        res.status(400).json({message: "Invalid class data"})
    }
})


// Get all class
const getClass = asyncHandler(async (req, res) => {
    const classes = await Class.find({});
    res.status(200).json(classes)
})

// Update a class
const editClass = asyncHandler(async (req, res) => {
    let _id = req.params.id
    const classes = await Class.findById(_id);
    if (classes) {
        classes.className = req.body.className || classes.className;
        classes.classTime = req.body.classTime || classes.classTime;


        const editClass = await classes.save();
        res.json(editClass);
    } else {
        res.status(404).json({status: "FAILED", message: "Class not found"});

    }
})
 // Delete a class
const deleteClass = asyncHandler(async (req, res) => {
    const classes = await Class.findById(req.params.id);
    if (classes) {
        await classes.deleteOne();
        res.json({message: 'Class removed'});
    } else {
        res.status(404).json({status: "FAILED", message: "Class not found"});
    }
})

export {createClass,getClass, editClass, deleteClass}