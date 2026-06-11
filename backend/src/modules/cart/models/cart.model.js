import mongoose, { Schema, model } from "mongoose";

const cartProductSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    option: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    hexColor: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    subTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    products: {
      type: [cartProductSchema],
      required: true,
      validate: {
        validator: (products) => products.length > 0,
        message: "Cart must have at least one product",
      },
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      default: "pending",
      trim: true,
    },
  },
  { timestamps: true, strict: false }
);

export default model("cart", cartSchema);
