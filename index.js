import express from "express";
import { connectDb } from "./dbConnect/connectDb.js";
import { constantData } from "./constants/constants.js";
import manageRoute from "./route/index.js";
import { connect } from "mongoose";
import { timeLog } from "./middleware/logger.js";


const app = express();

connectDb(constantData.mongoURl);


app.use(express.json());
app.use(timeLog);
app.use(manageRoute());


app.listen(constantData.port, () => {
    console.log(`Server connected at : ${constantData.port}`);
})