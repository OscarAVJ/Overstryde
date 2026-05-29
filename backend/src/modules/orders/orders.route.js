import express from "express"
import ordersController from "../orders/orders.controller.js"
// Router ayuda a colocar los métodos que tendrá un endpoint
const router = express.Router()

router.route("/")
.get(ordersController.getOrders)
.post(ordersController.insertOrders);


router.route("/:id")
.put(ordersController.updateOrders)
.delete(ordersController.deleteOrders);

export default router;