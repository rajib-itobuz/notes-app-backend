import mongoose from "mongoose";

const notes = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
    isHidden: {
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true });


export const NotesApp = mongoose.model("Notes", notes);