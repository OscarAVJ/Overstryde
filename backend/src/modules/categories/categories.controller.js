import { isValidObjectId } from "mongoose";
import categoryModel from "./categories.model.js";
import subcategoryModel from "../subcategories/models/subcategory.model.js";

const categoryController = {};

const TYPE_LABELS = {
  male: "Hombres",
  female: "Mujeres",
  accesory: "Accesorios",
};

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
  let { name, slug, type, genre } = payload;

  name = name?.trim();
  slug = slug?.trim() || (name ? normalizeSlug(name) : undefined);
  type = type?.trim() || genre?.trim();

  if (!isUpdate || name !== undefined) {
    if (!name) {
      return { error: "Category name required" };
    }
  }

  if (!isUpdate || type !== undefined) {
    if (!["male", "female", "accesory"].includes(type)) {
      return { error: "Category type must be male, female or accesory" };
    }
  }

  if ((!isUpdate || slug !== undefined) && !slug) {
    return { error: "Category slug required" };
  }

  const category = { name, slug, type };

  Object.keys(category).forEach((key) => {
    if (category[key] === undefined) {
      delete category[key];
    }
  });

  return { category };
};

const buildCategoryPathType = (type) => (type === "accesory" ? "accesories" : type);

const groupCategoriesByType = (categories, subcategories) => {
  const groups = {
    male: { category: TYPE_LABELS.male, type: "male", items: [] },
    female: { category: TYPE_LABELS.female, type: "female", items: [] },
    accesory: { category: TYPE_LABELS.accesory, type: "accesory", items: [] },
  };

  categories.forEach((category) => {
    const categorySubcategories = subcategories.filter(
      (subcategory) => subcategory.category.toString() === category._id.toString(),
    );

    groups[category.type].items.push({
      id: category._id,
      title: category.name,
      slug: category.slug,
      links: categorySubcategories.map((subcategory) => ({
        id: subcategory._id,
        label: subcategory.name,
        href: `/products?category=${category.slug}&subcategory=${subcategory.slug}&gender=${buildCategoryPathType(category.type)}`,
      })),
    });
  });

  return groups;
};

categoryController.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ type: 1, name: 1 });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoryController.getGroupedCategories = async (req, res) => {
  try {
    const [categories, subcategories] = await Promise.all([
      categoryModel.find().sort({ type: 1, name: 1 }),
      subcategoryModel.find().sort({ name: 1 }),
    ]);

    return res.status(200).json(groupCategoriesByType(categories, subcategories));
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoryController.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid category id" });
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoryController.insertCategory = async (req, res) => {
  try {
    const validateDataResult = validateData(req.body);
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }

    const newCategory = new categoryModel(validateDataResult.category);
    const savedCategory = await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoryController.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid category id" });
    }

    const categoryToUpdate = await categoryModel.findById(id);
    if (!categoryToUpdate) {
      return res.status(404).json({ message: "Category not found" });
    }

    const validateDataResult = validateData(req.body, { isUpdate: true });
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      validateDataResult.category,
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoryController.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid category id" });
    }

    const hasSubcategories = await subcategoryModel.exists({ category: id });
    if (hasSubcategories) {
      return res.status(409).json({
        message: "Cannot delete category with subcategories",
      });
    }

    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default categoryController;
