import mongoose from "mongoose";
const user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });


export const User = mongoose.model("User", user);