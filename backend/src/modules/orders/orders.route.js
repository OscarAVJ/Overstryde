import express from "express";
import ordersController from "./orders.controller.js";

const router = express.Router();

router.route("/")
  .get(ordersController.getOrders)
  .post(ordersController.insertOrders);

router.route("/:id")
  .get(ordersController.getOrderById)
  .put(ordersController.updateOrders)
  .delete(ordersController.deleteOrders);

export default router;