import { Schema, model } from "mongoose";
import imageSchema from "../../../utils/image.schema.js";

const shortcutSchema = new Schema(
  {
    shortcut_title: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const bannerSchema = new Schema(
  {
    image: imageSchema,
    description: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    shortcuts: [shortcutSchema],
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default model("banners", bannerSchema);
