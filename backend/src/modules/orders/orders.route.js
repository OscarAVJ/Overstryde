import { Router } from "express";
import ordersController from "./orders.controller.js";

const ordersRouter = Router();

ordersRouter
  .route("/")
  .get(ordersController.getOrders)
  .post(ordersController.insertOrder);

ordersRouter
  .route("/:id")
  .get(ordersController.getOrderById)
  .put(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);

export default ordersRouter;
