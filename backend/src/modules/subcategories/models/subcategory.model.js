import { Schema, model } from "mongoose";

const subcategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  { timestamps: true },
);

export default model("subcategories", subcategorySchema);
