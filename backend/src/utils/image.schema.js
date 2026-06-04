import { Schema } from "mongoose";

const imageSchema = new Schema({
    path: {type:String},
    public_id: {type:String}
}, {_id:false})

export default imageSchema