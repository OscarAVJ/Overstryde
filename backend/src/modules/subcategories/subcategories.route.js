import { Router } from "express";
import subcategoryController from "./subcategories.controller.js";

const subcategoriesRouter = Router();

subcategoriesRouter
  .route("/")
  .get(subcategoryController.getSubcategories)
  .post(subcategoryController.insertSubcategory);

subcategoriesRouter
  .route("/:id")
  .get(subcategoryController.getSubcategoryById)
  .put(subcategoryController.updateSubcategory)
  .delete(subcategoryController.deleteSubcategory);

export default subcategoriesRouter;
