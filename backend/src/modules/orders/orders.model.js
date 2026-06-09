import mongoose, { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    shopping_cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shopping_carts",
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
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    status: {
      type: String,
      required: true,
      enum: ["returned", "delivered", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default model("orders", OrderSchema);