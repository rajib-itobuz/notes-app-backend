import mongoose from "mongoose";

export const connectDb = (url) => {
    mongoose.connect(url)

    mongoose.connection.on('error', (error) => {
        console.error('mongodb connection error:', error);
        mongoose.connection.close();
        process.exit(1);
    });

    mongoose.connection.once('open', () => {
        console.log('connected to mongodb');
    });

}