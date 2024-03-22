import express from "express";
import { connectDb } from "./dbConnect/connectDb.js";
import { config } from "./config/index.js";
import manageRoute from "./route/index.js";
import { timeLog } from "./middleware/logger.js";


const app = express();

connectDb(config.mongoURl);


app.use(express.json());
app.use(timeLog);
app.use(manageRoute());


app.listen(config.port, () => {
    console.log(`Server connected at : ${config.port}`);
})