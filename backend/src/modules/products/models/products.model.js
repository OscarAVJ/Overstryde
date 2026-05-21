import { Schema, model } from "mongoose";
import varianSchema from "./variants.schema.js";

const productModel = new Schema(
  {
    name: { type: String },
    images: { type: String },
    description: { type: String },
    fit: { type: String },
    product_type: { type: String },
    gender: { type: String },
    categories: [{ type: String }],
    variants: [varianSchema],
    price: { type: Number },
    expiration_date: { type: Date },
  },
  { timestamps: true, strict: false }
);

export default model("products", productModel);
