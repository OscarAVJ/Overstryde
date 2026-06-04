import productModel from "./models/products.model.js";
import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const productController = {};

const parseJsonField = (value, fieldName) => {
  if (value === undefined) return undefined;
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`${fieldName} must be valid JSON`);
  }
};

const validateData = (payload, { isUpdate = false } = {}) => {
  let {
    name,
    description,
    fit,
    product_type,
    gender,
    categories,
    variants,
    price,
    expiration_date,
  } = payload;

  name = name?.trim();
  description = description?.trim();
  fit = fit?.trim();
  product_type = product_type?.trim();
  gender = gender?.trim();
  try {
    categories = parseJsonField(categories, "Categories");
    variants = parseJsonField(variants, "Variants");
  } catch (error) {
    return { error: error.message };
  }
  if (!isUpdate || name !== undefined) {
    if (!name) {
      return { error: "Product name required" };
    }
  }
  if (!isUpdate || price !== undefined) {
    if (!price && price !== 0) {
      return { error: "Product price required" };
    }
    if (isNaN(price) || Number(price) < 0) {
      return { error: "Product price must be a valid positive number" };
    }
    price = Number(price);
  }
  if (!isUpdate || categories !== undefined) {
    if (!Array.isArray(categories)) {
      return { error: "Categories must be an array" };
    }
    categories = categories.map((category) => category?.trim()).filter(Boolean);
  }
  if (!isUpdate || variants !== undefined) {
    if (!Array.isArray(variants)) {
      return { error: "Variants must be an array" };
    }
    if (variants.length === 0) {
      return { error: "At least one variant is required" };
    }

    for (const variant of variants) {
      variant.size = variant.size?.trim();
      variant.color = variant.color?.trim();
      if (!variant.size) {
        return { error: "Variant size required" };
      }
      if (!variant.color) {
        return { error: "Variant color required" };
      }
      if (!variant.stock && variant.stock !== 0) {
        return { error: "Variant stock required" };
      }
      if (isNaN(variant.stock) || Number(variant.stock) < 0) {
        return { error: "Variant stock must be a valid positive number" };
      }
      variant.stock = Number(variant.stock);
    }
  }

  const product = {
    name,
    description,
    fit,
    product_type,
    gender,
    categories,
    variants,
    price,
    expiration_date,
  };

  Object.keys(product).forEach((key) => {
    if (product[key] === undefined) {
      delete product[key];
    }
  });

  return { product };
};

const deleteCloudinaryImages = async (images = []) => {
  const publicIds = images.map((image) => image.public_id).filter(Boolean);
  await Promise.allSettled(
    publicIds.map((publicId) => cloudinary.uploader.destroy(publicId)),
  );
};

productController.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

productController.getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

productController.insertProduct = async (req, res) => {
  try {
    const validateDataResult = validateData(req.body);
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }
    const product = validateDataResult.product;
    const imagesReq = req.files;
    if (!Array.isArray(imagesReq)) {
      return res.status(400).json({ message: "Images must be an array" });
    }
    if (imagesReq.length < 1) {
      return res.status(400).json({ message: "You must add at least 1 image" });
    }
    if (imagesReq.length > 5) {
      return res
        .status(400)
        .json({ message: "You cannot add more than 5 images" });
    }
    product.images = imagesReq.map((image) => ({
      path: image.path,
      public_id: image.filename,
    }));
    const newProduct = new productModel(product);
    const savedProduct = await newProduct.save();
    return res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    const productToUpdate = await productModel.findById(id);
    if (!productToUpdate) {
      return res.status(404).json({ message: "Product not found" });
    }
    const validateDataResult = validateData(req.body, { isUpdate: true });
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }
    const product = validateDataResult.product;
    const imagesReq = req.files;
    const shouldUpdateImages = Array.isArray(imagesReq) && imagesReq.length > 0;
    if (shouldUpdateImages) {
      if (imagesReq.length > 5) {
        return res
          .status(400)
          .json({ message: "You cannot add more than 5 images" });
      }
      product.images = imagesReq.map((image) => ({
        path: image.path,
        public_id: image.filename,
      }));
    }
    const updatedProduct = await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (shouldUpdateImages) {
      await deleteCloudinaryImages(productToUpdate.images);
    }
    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

productController.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    await deleteCloudinaryImages(deletedProduct.images);
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export default productController;
