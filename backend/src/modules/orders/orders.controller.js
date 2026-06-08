import orderModel from "./orders.model.js";

const ordersController = {};

ordersController.getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

ordersController.insertOrders = async (req, res) => {
  try {
    const {
      shopping_cart_id,
      delivered_address,
      payment_method,
      payment_status,
      status,
    } = req.body;

    const newOrder = new orderModel({
      shopping_cart_id,
      delivered_address,
      payment_method,
      payment_status,
      status,
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

ordersController.deleteOrders = async (req, res) => {
  try {
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

ordersController.updateOrders = async (req, res) => {
  try {
    const {
      shopping_cart_id,
      delivered_address,
      payment_method,
      payment_status,
      status,
    } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        shopping_cart_id,
        delivered_address,
        payment_method,
        payment_status,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

ordersController.getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default ordersController;