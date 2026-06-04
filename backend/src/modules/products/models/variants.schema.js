import { Schema, model } from "mongoose";
const varianSchema = new Schema(
  {
    size: { type: String },
    color: { type: String },
    stock: { type: Number },
  },
  { _id: true }
);
export default varianSchema;
