import { isValidObjectId } from "mongoose";
import cartModel from "./models/cart.model.js";
import productsModel from "../products/models/products.model.js";
import ordersModel from "../orders/models/orders.model.js";

const cartController = {};

cartController.getCart = async (req, res) => {
  try {
    const data = await cartModel
      .find()
      .populate("products.productId", "name price images");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

cartController.getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid cart id" });
    }

    const cart = await cartModel
      .findById(id)
      .populate("products.productId", "name price images");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

cartController.getCartsByCustomerId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid cart id" });
    }

    const cart = await cartModel
      .find({customerId: id})
      .populate("products.productId", "name price images");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

cartController.insertCart = async (req, res) => {
  try {
    const { customerId, products, status } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart must have at least one product" });
    }

    let total = 0;
    const newProducts = [];

    for (const element of products) {
      const quantity = Number(element.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) {
        return res
          .status(400)
          .json({ message: "Product quantity must be a positive integer" });
      }

      const productFound = await productsModel.findById(element.productId);
      if (!productFound) {
        return res.status(404).json({ message: "Product not found" });
      }

      const subTotal = productFound.price * quantity;
      total += subTotal;

      newProducts.push({
        productId: productFound._id,
        quantity,
        subTotal,
      });
    }

    const newCart = new cartModel({
      customerId,
      products: newProducts,
      total,
      status,
    });

    const savedCart = await newCart.save();
    return res.status(201).json({
      message: "Cart created successfully",
      cart: savedCart,
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" });
  }
};

cartController.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid cart id" });
    }

    const foundCart = await cartModel.findById(id);
    if (!foundCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const { customerId, products, status } = req.body;
    if (!isValidObjectId(customerId)) {
      return res.status(400).json({ message: "Invalid customer id" });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart must have at least one product" });
    }

    let total = 0;
    const newProducts = [];

    for (const element of products) {
      if (!isValidObjectId(element.productId)) {
        return res.status(400).json({ message: "Invalid product id" });
      }

      const quantity = Number(element.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) {
        return res
          .status(400)
          .json({ message: "Product quantity must be a positive integer" });
      }

      const productFound = await productsModel.findById(element.productId);
      if (!productFound) {
        return res.status(404).json({ message: "Product not found" });
      }

      const subTotal = productFound.price * quantity;
      total += subTotal;

      newProducts.push({
        productId: productFound._id,
        quantity,
        subTotal,
      });
    }

    foundCart.customerId = customerId;
    foundCart.products = newProducts;
    foundCart.total = total;
    foundCart.status = status;

    const updatedCart = await foundCart.save();
    return res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

cartController.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid cart id" });
    }

    const deletedCart = await cartModel.findByIdAndDelete(id);
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default cartController;
