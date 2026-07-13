import { isValidObjectId } from "mongoose";
import orderModel from "./models/orders.model.js";
import cartModel from "../cart/models/cart.model.js";
import customerModel from "../customers/customer.model.js";

const ordersController = {};

const buildDeliveredAddress = (address = {}) => {
  const addressParts = [
    `Nombre: ${[address.firstName, address.lastName].filter(Boolean).join(" ")}`,
    `Direccion: ${address.address}`,
    `Departamento: ${address.department}`,
    `Ciudad: ${address.city}`,
    `Pais: ${address.country}`,
    `Referencia: ${address.references}`,
    `Telefono: ${address.phone}`,
    `Email: ${address.email}`,
  ];

  return addressParts.filter((part) => !part.endsWith(": ") && !part.endsWith(":")).join(" | ");
};

const normalizeDeliveryAddress = (payload = {}) => {
  const address = {
    country: payload.country?.trim(),
    address: payload.address?.trim(),
    department: payload.department?.trim(),
    city: payload.city?.trim(),
    references: payload.references?.trim() || payload.reference?.trim(),
    phone: payload.phone?.trim() || payload.phoneNumber?.trim(),
    firstName: payload.firstName?.trim(),
    lastName: payload.lastName?.trim(),
    email: payload.email?.trim(),
  };

  if (payload.address_id && isValidObjectId(payload.address_id)) {
    address.address_id = payload.address_id;
  }

  return address;
};

const validateDeliveryAddress = (payload = {}) => {
  const address = normalizeDeliveryAddress(payload);
  const requiredFields = ["country", "address", "department", "city", "phone"];
  const missingField = requiredFields.find((field) => !address[field]);

  if (missingField) {
    return { error: "Complete all required address fields" };
  }

  return { address };
};

const validateOrderData = async (payload) => {
  const {
    shopping_cart_id,
    customerId,
    delivered_address,
    delivery_address,
    payment_method,
    payment_status,
    status,
  } = payload;

  if (!isValidObjectId(shopping_cart_id)) {
    return { error: "Invalid shopping cart id" };
  }

  if (!isValidObjectId(customerId)) {
    return { error: "Invalid customer id" };
  }

  const cartFound = await cartModel.findById(shopping_cart_id);
  if (!cartFound) {
    return { error: "Shopping cart not found" };
  }

  const customerFound = await customerModel.findById(customerId);
  if (!customerFound) {
    return { error: "Customer not found" };
  }

  if (!payment_method?.trim()) {
    return { error: "Payment method is required" };
  }

  if (!payment_status?.trim()) {
    return { error: "Payment status is required" };
  }

  const validateDeliveryAddressResult = delivery_address
    ? validateDeliveryAddress(delivery_address)
    : null;

  if (validateDeliveryAddressResult?.error) {
    return { error: validateDeliveryAddressResult.error };
  }

  const deliveredAddress = validateDeliveryAddressResult
    ? buildDeliveredAddress(validateDeliveryAddressResult.address)
    : delivered_address?.trim();

  if (!deliveredAddress) {
    return { error: "Delivered address is required" };
  }

  if (status && !["returned", "delivered", "pending"].includes(status)) {
    return { error: "Invalid order status" };
  }

  return {
    order: {
      shopping_cart_id,
      customerId,
      delivered_address: deliveredAddress,
      delivery_address: validateDeliveryAddressResult?.address,
      payment_method: payment_method.trim(),
      payment_status: payment_status.trim(),
      status,
    },
    customerFound,
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
    }).populate("customerId", "name last_name email photo");
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
    }).populate("customerId", "name last_name email");
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

    validateDataResult.customerFound.purchase_history.push({
      orders_id: savedOrder._id,
    });

    if (req.body.save_address && validateDataResult.order.delivery_address?.address) {
      const addressExists = validateDataResult.customerFound.addresses.some((address) => (
        address.address === validateDataResult.order.delivery_address.address
        && address.department === validateDataResult.order.delivery_address.department
        && address.city === validateDataResult.order.delivery_address.city
        && address.country === validateDataResult.order.delivery_address.country
        && address.phone === validateDataResult.order.delivery_address.phone
      ));

      if (!addressExists) {
        validateDataResult.customerFound.addresses.push({
          country: validateDataResult.order.delivery_address.country,
          address: validateDataResult.order.delivery_address.address,
          department: validateDataResult.order.delivery_address.department,
          city: validateDataResult.order.delivery_address.city,
          references: validateDataResult.order.delivery_address.references,
          phone: validateDataResult.order.delivery_address.phone,
        });
      }
    }

    await validateDataResult.customerFound.save();

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
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
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
