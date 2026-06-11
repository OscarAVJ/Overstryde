import { isValidObjectId } from "mongoose";
import cartModel from "./models/cart.model.js";
import productsModel from "../products/models/products.model.js";

const cartController = {};

const populateCartProducts = (query) =>
  query.populate("products.productId", "name price stock product_type images variants");

const buildCartProducts = async (products = []) => {
  if (!Array.isArray(products) || products.length === 0) {
    return { error: "Cart must have at least one product" };
  }

  let total = 0;
  const newProducts = [];

  for (const element of products) {
    if (!isValidObjectId(element.productId)) {
      return { error: "Invalid product id" };
    }
    const quantity = Number(element.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      return { error: "Product quantity must be a positive integer" };
    }

    const productFound = await productsModel.findById(element.productId);
    if (!productFound) {
      return { error: "Product not found", status: 404 };
    }

    let variantFound = null;
    let availableStock = productFound.stock;

    if (productFound.product_type === "ropa") {
      if (!isValidObjectId(element.variantId)) {
        return { error: "Invalid variant id" };
      }

      variantFound = productFound.variants.id(element.variantId);
      if (!variantFound) {
        return { error: "Variant not found", status: 404 };
      }

      availableStock = variantFound.stock;
    } else if (element.variantId) {
      return { error: "Only clothing products can use variants" };
    }

    if (!availableStock && availableStock !== 0) {
      return { error: `Stock is not configured for ${productFound.name}` };
    }

    if (quantity > availableStock) {
      return {
        error: `Only ${availableStock} units available for ${productFound.name}`,
      };
    }

    const subTotal = productFound.price * quantity;
    total += subTotal;

    newProducts.push({
      productId: productFound._id,
      variantId: variantFound?._id,
      option: variantFound?.size,
      color: variantFound?.color,
      hexColor: variantFound?.hexColor,
      quantity,
      subTotal,
    });
  }

  return { products: newProducts, total };
};

cartController.getCart = async (req, res) => {
  try {
    const data = await populateCartProducts(cartModel.find());
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

    const cart = await populateCartProducts(cartModel.findById(id));
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

    const cart = await populateCartProducts(cartModel.find({ customerId: id }));
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
    const cartProductsResult = await buildCartProducts(products);

    if (cartProductsResult.error) {
      return res
        .status(cartProductsResult.status || 400)
        .json({ message: cartProductsResult.error });
    }

    const newCart = new cartModel({
      customerId,
      products: cartProductsResult.products,
      total: cartProductsResult.total,
      status,
    });

    const savedCart = await newCart.save();
    const populatedCart = await populateCartProducts(cartModel.findById(savedCart._id));

    return res.status(201).json({
      message: "Cart created successfully",
      cart: populatedCart,
    });
  } catch (error) {
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
    const cartProductsResult = await buildCartProducts(products);

    if (cartProductsResult.error) {
      return res
        .status(cartProductsResult.status || 400)
        .json({ message: cartProductsResult.error });
    }

    foundCart.customerId = customerId;
    foundCart.products = cartProductsResult.products;
    foundCart.total = cartProductsResult.total;
    foundCart.status = status;

    await foundCart.save();
    const populatedCart = await populateCartProducts(cartModel.findById(id));

    return res.status(200).json({
      message: "Cart updated successfully",
      cart: populatedCart,
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
