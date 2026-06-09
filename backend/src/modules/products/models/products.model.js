import { Schema, model } from "mongoose";
import varianSchema from "./variants.schema.js";
import imageSchema from "../../../utils/image.schema.js";

const productModel = new Schema(
  {
    name: { type: String },
    images: [imageSchema],
    description: { type: String },
    fit: { type: String },
    product_type: { type: String, enum: ["alimenticio", "ropa"] },
    gender: { type: String, enum: ["male", "female", "accesory"] },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "subcategories",
      },
    ],
    variants: [varianSchema],
    price: { type: Number },
    expiration_date: { type: Date },
  },
  { timestamps: true, strict: false }
);

export default model("products", productModel);
