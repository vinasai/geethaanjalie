import mongoose from "mongoose";
import bcrypt from "bcryptjs";


// User Model collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        default: "student",
    },
    profilePic: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }

}, {
    timestamps: true
})


// Encrypt the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;
