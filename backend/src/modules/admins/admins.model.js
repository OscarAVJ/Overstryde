/*Campos: 
id 
name 
last_name
photo
email 
password 
active
is_verified,
loginAttempts,
timeOut
*/
import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    name: {
        type: String
    },
    last_name: {
        type: String
    },
    photo: {
        type: String
    },
    public_id: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    isVerified: {
        type: Boolean
    },
    loginAttempts: {
        type: Number
    },
    timeOut: {
        type: Date
    }
},
    {
        timestamps: true,
        strict: false
    }
)

export default model("admins", AdminSchema)
