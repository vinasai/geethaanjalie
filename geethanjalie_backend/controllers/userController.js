import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import UserOTPVerification from "../modals/UserOTPVerification.js";
import sendEmail from "../utils/email-service/email.js";
import jwt from "jsonwebtoken";
import sendPasswordResetEmail from "../utils/reset_password.js";

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        contactNo,
        dateOfBirth,
        password,
        age,
        role,
        profilePic
    } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({
        name,
        email,
        contactNo,
        dateOfBirth,
        password,
        age,
        role,
        profilePic
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password :user.password,
            contactNo: user.contactNo,
            dateOfBirth: user.dateOfBirth,
            role: user.role,
            age: user.age,
            profilePic: user.profilePic,
            isVerified: user.isVerified,
            isEmailVerified: user.isEmailVerified,
        })
    } else {
        res.status(400).json({ message: "Invalid user data" })
    }
})

const createUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        contactNo,
        dateOfBirth,
    } = req.body;


    const user = await User.create({
        name,
        email,
        password,
        contactNo,
        dateOfBirth,
    })

    if (user) {
        res.status(201).json(user)
    } else {
        res.status(400).json({ message: "Invalid User data" })
    }
})

// Verify a user
const verifiedUser = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById({ _id });
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password=req.body.password  || user.password;
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
        user.contactNo = req.body.contactNo || user.contactNo;
        user.role = req.body.role || user.role;
        user.profilePic = req.body.profilePic || user.profilePic;
        user.isVerified = req.body.isVerified || user.isVerified;
        // user.isEmailVerified = req.body.isEmailVerified || user.isEmailVerified;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            password :updateUser.password,
            role: updatedUser.role,
            profilePic: updatedUser.profilePic,
            isVerified: updatedUser.isVerified,
            // isEmailVerified: updatedUser.isEmailVerified,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// Login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(200).json(user)
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

const getUserCount = asyncHandler(async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ userCount })
    } catch (error) {
        console.error("Error fetching user count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
// user forgot password
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    // const user = await User.findOne({email});
    if (!email) {
        res.status(404).json({ message: "Email not found" })
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({ message: "User not found" })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '60' });
    const date = new Date();
    const newMinutes = date.getMinutes() + 60;
    date.setMinutes(newMinutes);
    user.resetPasswordToken = token;
    user.resetPasswordExpire = date;
    await user.save();

    const verificationEmailResponse = await sendPasswordResetEmail(email, token, user.name);
    if (verificationEmailResponse.error) {
        res.status(404).json({ message: "Email couldn't send", verificationEmailResponse })
    } else {
        res.status(200).json({ message: "Email sent successfully" })
    }

})


// user reset password
const resetPassword = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById({ _id });
    if (user) {
        user.password = req.body.password;
        const resetPassword = await user.save();
        res.status(200).json({ message: "Password reset successfully", resetPassword })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ status: "FAILED", message: "User not found" });
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        contactNo,
        password,
        dateOfBirth,
    } = req.body;

    const user = await User.findById(req.params.id);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.contactNo = contactNo || user.contactNo;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.password = password || user.password;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});



export { getUserCount, registerUser, loginUser, verifiedUser, resetPassword, forgotPassword, getUsers, createUser, deleteUser,updateUser }


