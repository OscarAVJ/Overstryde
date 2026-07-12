import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    shopping_cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
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
