import express from "express";
import customerController from "./customer.controller.js";

const router = express.Router();

router.route("/")
.get(customerController.getCustomers);

router.route("/:id")
.get(customerController.getCustomerById)
.put(customerController.updateCustomers)
.delete(customerController.deleteCustomers);

export default router;