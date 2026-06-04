import { isValidObjectId } from "mongoose";
import orderModel from "./models/orders.model.js";
import cartModel from "../cart/models/cart.model.js";

const ordersController = {};

const validateOrderData = async (payload) => {
  const {
    shopping_cart_id,
    delivered_address,
    payment_method,
    payment_status,
    status,
  } = payload;

  if (!isValidObjectId(shopping_cart_id)) {
    return { error: "Invalid shopping cart id" };
  }

  const cartFound = await cartModel.findById(shopping_cart_id);
  if (!cartFound) {
    return { error: "Shopping cart not found" };
  }

  if (!delivered_address?.trim()) {
    return { error: "Delivered address is required" };
  }

  if (!payment_method?.trim()) {
    return { error: "Payment method is required" };
  }

  if (!payment_status?.trim()) {
    return { error: "Payment status is required" };
  }

  if (status && !["returned", "delivered", "pending"].includes(status)) {
    return { error: "Invalid order status" };
  }

  return {
    order: {
      shopping_cart_id,
      delivered_address: delivered_address.trim(),
      payment_method: payment_method.trim(),
      payment_status: payment_status.trim(),
      status,
    },
  };
};

ordersController.getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate({
      path: "shopping_cart_id",
      populate: {
        path: "products.productId",
        select: "name price images",
      },
    });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

ordersController.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await orderModel.findById(id).populate({
      path: "shopping_cart_id",
      populate: {
        path: "products.productId",
        select: "name price images",
      },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

ordersController.insertOrder = async (req, res) => {
  try {
    const validateDataResult = await validateOrderData(req.body);
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }

    const newOrder = new orderModel(validateDataResult.order);
    const savedOrder = await newOrder.save();

    return res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

ordersController.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const orderFound = await orderModel.findById(id);
    if (!orderFound) {
      return res.status(404).json({ message: "Order not found" });
    }

    const validateDataResult = await validateOrderData(req.body);
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      validateDataResult.order,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

ordersController.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const deletedOrder = await orderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default ordersController;
