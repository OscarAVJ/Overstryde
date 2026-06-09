import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    type: {
      type: String,
      required: true,
      enum: ["male", "female", "accesory"],
      trim: true,
    },
  },
  { timestamps: true },
);

export default model("categories", categorySchema);
