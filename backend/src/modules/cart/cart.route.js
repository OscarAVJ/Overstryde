import { Router } from "express";
import cartController from "./cart.controller.js";

const cartRouter = Router();

cartRouter
  .route("/")
  .get(cartController.getCart)
  .post(cartController.insertCart);

cartRouter
  .route("/:id")
  .get(cartController.getCartById)
  .put(cartController.updateCart)
  .delete(cartController.deleteCart);

export default cartRouter;
