import mongoose from "mongoose";
import { config } from "./src/config.js";

mongoose.connect(config.db.URI)
const connection = mongoose.connection

connection.once("open", ()=>{
    console.log("db connected")
})