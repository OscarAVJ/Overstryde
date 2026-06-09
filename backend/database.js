import mongoose from "mongoose";
import { config } from "./src/utils/config.js";

mongoose.connect(config.db.URI)
const connection = mongoose.connection

connection.once("open", ()=>{
    console.log("db connected")
})
connection.on("disconnected", ()=>{
    console.log("DB is disconnected")
})

connection.on("error", (error)=>{
    console.log("error found" + error)
})