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

    delivery_address: {
      country: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      department: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      references: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      address_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
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
