import { Router } from "express";
import categoryController from "./categories.controller.js";

const categoriesRouter = Router();

categoriesRouter
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.insertCategory);

categoriesRouter.route("/grouped").get(categoryController.getGroupedCategories);

categoriesRouter
  .route("/:id")
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default categoriesRouter;
