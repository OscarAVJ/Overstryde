import { isValidObjectId } from "mongoose";
import categoryModel from "../categories/categories.model.js";
import productModel from "../products/models/products.model.js";
import subcategoryModel from "./models/subcategory.model.js";

const subcategoryController = {};

const normalizeSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const validateData = (payload, { isUpdate = false } = {}) => {
  let { name, slug, category } = payload;

  name = name?.trim();
  slug = slug?.trim() || (name ? normalizeSlug(name) : undefined);
  category = category?.trim();

  if (!isUpdate || name !== undefined) {
    if (!name) {
      return { error: "Subcategory name required" };
    }
  }

  if ((!isUpdate || slug !== undefined) && !slug) {
    return { error: "Subcategory slug required" };
  }

  if (!isUpdate || category !== undefined) {
    if (!isValidObjectId(category)) {
      return { error: "Valid category id required" };
    }
  }

  const subcategory = { name, slug, category };

  Object.keys(subcategory).forEach((key) => {
    if (subcategory[key] === undefined) {
      delete subcategory[key];
    }
  });

  return { subcategory };
};

const ensureCategoryExists = async (category) => {
  if (!category) return true;
  return Boolean(await categoryModel.exists({ _id: category }));
};

subcategoryController.getSubcategories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      if (!isValidObjectId(req.query.category)) {
        return res.status(400).json({ message: "Invalid category id" });
      }
      filter.category = req.query.category;
    }

    const subcategories = await subcategoryModel
      .find(filter)
      .populate("category", "name slug type")
      .sort({ name: 1 });

    return res.status(200).json(subcategories);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

subcategoryController.getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid subcategory id" });
    }

    const subcategory = await subcategoryModel
      .findById(id)
      .populate("category", "name slug type");

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    return res.status(200).json(subcategory);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

subcategoryController.insertSubcategory = async (req, res) => {
  try {
    const validateDataResult = validateData(req.body);
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }

    const categoryExists = await ensureCategoryExists(validateDataResult.subcategory.category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newSubcategory = new subcategoryModel(validateDataResult.subcategory);
    const savedSubcategory = await newSubcategory.save();

    return res.status(201).json({
      message: "Subcategory created successfully",
      subcategory: savedSubcategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Subcategory already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

subcategoryController.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid subcategory id" });
    }

    const subcategoryToUpdate = await subcategoryModel.findById(id);
    if (!subcategoryToUpdate) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const validateDataResult = validateData(req.body, { isUpdate: true });
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }

    const categoryExists = await ensureCategoryExists(validateDataResult.subcategory.category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedSubcategory = await subcategoryModel.findByIdAndUpdate(
      id,
      validateDataResult.subcategory,
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      message: "Subcategory updated successfully",
      subcategory: updatedSubcategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Subcategory already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

subcategoryController.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid subcategory id" });
    }

    const hasProducts = await productModel.exists({ subcategory: id });
    if (hasProducts) {
      return res.status(409).json({
        message: "Cannot delete subcategory with products",
      });
    }

    const deletedSubcategory = await subcategoryModel.findByIdAndDelete(id);
    if (!deletedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    return res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default subcategoryController;
