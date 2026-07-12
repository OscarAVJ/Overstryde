import express from "express";
import customerController from "./customer.controller.js";

const router = express.Router();

router.route("/")
.get(customerController.getCustomers);

router.route("/me")
.get(customerController.getCurrentCustomer)
.put(customerController.updateCurrentCustomer);

router.route("/me/addresses")
.post(customerController.addAddress);

router.route("/me/addresses/:addressId")
.put(customerController.updateAddress)
.delete(customerController.deleteAddress);

router.route("/:id")
.get(customerController.getCustomerById)
.put(customerController.updateCustomers)
.delete(customerController.deleteCustomers);

export default router;
