import productModel from "./models/products.model.js";
import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import categoryModel from "../categories/categories.model.js";
import subcategoryModel from "../subcategories/models/subcategory.model.js";

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

const validateData = (payload, { isUpdate = false, currentProduct = null } = {}) => {
  let {
    name,
    description,
    fit,
    product_type,
    gender,
    subCategories,
    subcategory,
    variants,
    price,
    stock,
    expiration_date,
  } = payload;

  name = name?.trim();
  description = description?.trim();
  fit = fit?.trim();
  product_type = product_type?.trim();
  gender = gender?.trim();
  subcategory = subcategory?.trim();
  try {
    subCategories = parseJsonField(subCategories, "SubCategories");
    variants = parseJsonField(variants, "Variants");
  } catch (error) {
    return { error: error.message };
  }
  if (subCategories === undefined && subcategory !== undefined) {
    subCategories = [subcategory];
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
  const nextProductType = product_type ?? currentProduct?.product_type;

  if (
    product_type !== undefined &&
    !["alimenticio", "ropa", "general"].includes(product_type)
  ) {
    return { error: "Product type must be alimenticio, ropa or general" };
  }
  if (
    gender !== undefined &&
    !["male", "female", "accesory"].includes(gender)
  ) {
    return { error: "Gender must be male, female or accesory" };
  }
  if (!isUpdate || subCategories !== undefined) {
    if (!Array.isArray(subCategories)) {
      return { error: "SubCategories must be an array" };
    }
    if (subCategories.length === 0) {
      return { error: "At least one subcategory is required" };
    }
    if (subCategories.some((subCategory) => !isValidObjectId(subCategory))) {
      return { error: "Every subcategory must be a valid id" };
    }
  }
  if (nextProductType === "ropa") {
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
        if (!variant.stock && variant.stock !== 0) {
          return { error: "Variant stock required" };
        }
        if (isNaN(variant.stock) || Number(variant.stock) < 0) {
          return { error: "Variant stock must be a valid positive number" };
        }
        variant.stock = Number(variant.stock);
      }
    }
    stock = undefined;
  } else if (nextProductType) {
    if (variants !== undefined) {
      if (!Array.isArray(variants)) {
        return { error: "Variants must be an array" };
      }
      if (variants.length > 0) {
        return { error: "Only clothing products can have variants" };
      }
    }
    variants = [];

    if (!isUpdate || stock !== undefined || product_type !== undefined) {
      if (stock === undefined && currentProduct?.stock !== undefined) {
        stock = currentProduct.stock;
      }
      if (!stock && stock !== 0) {
        return { error: "Product stock required" };
      }
      if (isNaN(stock) || Number(stock) < 0) {
        return { error: "Product stock must be a valid positive number" };
      }
      stock = Number(stock);
    }
  }
  const product = {
    name,
    description,
    fit,
    product_type,
    gender,
    subCategories,
    variants,
    price,
    stock,
    expiration_date,
  };

  Object.keys(product).forEach((key) => {
    if (product[key] === undefined) {
      delete product[key];
    }
  });

  return { product };
};

const ensureProductRelations = async (product, currentProduct = {}) => {
  const subCategories = product.subCategories || currentProduct.subCategories;

  if (product.subCategories) {
    const uniqueSubcategories = [
      ...new Set(subCategories.map((item) => item.toString())),
    ];
    const foundSubcategories = await subcategoryModel.find({
      _id: { $in: uniqueSubcategories },
    });

    if (foundSubcategories.length !== uniqueSubcategories.length) {
      return { error: "One or more subcategories were not found" };
    }
  }

  return {};
};

const buildProductsFilter = async (query) => {
  const filter = {};
  const { category, subcategory, gender, product_type } = query;
  const categoryType = gender === "accesories" ? "accesory" : gender;
  let categoryId = null;

  if (gender) {
    filter.gender = categoryType;
  }

  if (product_type) {
    filter.product_type = product_type;
  }

  if (category) {
    const categoryFilter = isValidObjectId(category)
      ? { _id: category }
      : { slug: category };
    if (!isValidObjectId(category) && categoryType) {
      categoryFilter.type = categoryType;
    }
    const categoryFound = await categoryModel.findOne(categoryFilter);
    if (!categoryFound) {
      return { filter, shouldReturnEmpty: true };
    }
    categoryId = categoryFound._id;
    const subcategories = await subcategoryModel.find({ category: categoryId });
    if (subcategories.length === 0) {
      return { filter, shouldReturnEmpty: true };
    }
    filter.subCategories = { $in: subcategories.map((item) => item._id) };
  }

  if (subcategory) {
    const subcategoryFilter = isValidObjectId(subcategory)
      ? { _id: subcategory }
      : { slug: subcategory };

    if (categoryId) {
      subcategoryFilter.category = categoryId;
    }

    const subcategoryFound = await subcategoryModel.findOne(subcategoryFilter);
    if (!subcategoryFound) {
      return { filter, shouldReturnEmpty: true };
    }
    filter.subCategories = subcategoryFound._id;
  }

  return { filter };
};

const deleteCloudinaryImages = async (images = []) => {
  const publicIds = images.map((image) => image.public_id).filter(Boolean);
  await Promise.allSettled(
    publicIds.map((publicId) => cloudinary.uploader.destroy(publicId)),
  );
};

productController.getProducts = async (req, res) => {
  try {
    const { filter, shouldReturnEmpty } = await buildProductsFilter(req.query);
    if (shouldReturnEmpty) {
      return res.status(200).json([]);
    }

    const products = await productModel.find(filter).populate({
      path: "subCategories",
      select: "name slug category",
      populate: { path: "category", select: "name slug type" },
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

productController.getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate({
      path: "subCategories",
      select: "name slug category",
      populate: { path: "category", select: "name slug type" },
    });
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
    const relationsResult = await ensureProductRelations(product);
    if (relationsResult.error) {
      return res.status(400).json({ message: relationsResult.error });
    }
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
    const validateDataResult = validateData(req.body, {
      isUpdate: true,
      currentProduct: productToUpdate,
    });
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }
    const product = validateDataResult.product;
    const relationsResult = await ensureProductRelations(
      product,
      productToUpdate,
    );
    if (relationsResult.error) {
      return res.status(400).json({ message: relationsResult.error });
    }
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
    const effectiveProductType = product.product_type || productToUpdate.product_type;
    const updatePayload =
      effectiveProductType === "ropa"
        ? { $set: product, $unset: { stock: "" } }
        : product;

    const updatedProduct = await productModel.findByIdAndUpdate(id, updatePayload, {
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
