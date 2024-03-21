import mongoose from "mongoose";

export const connectDb = (url) => {
    try {
        mongoose.connect(url).then(() => {
            console.log("Database Connected");
        })
    } catch (err) {
        console.log("Database Disconnected");
    }
}