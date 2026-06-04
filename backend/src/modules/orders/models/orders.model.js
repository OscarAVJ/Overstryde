import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    shopping_cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
      required: true,
    },
    delivered_address: {
      type: String,
      required: true,
      trim: true,
    },
    payment_method: {
      type: String,
      required: true,
      trim: true,
    },
    payment_status: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["returned", "delivered", "pending"],
      default: "pending",
      trim: true,
    },
  },
  { timestamps: true, strict: false }
);

export default model("orders", orderSchema);
