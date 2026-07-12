import express from "express";
import customerController from "./customer.controller.js";
import { validateAuthCookie } from "../../middlewares/validateAuthCookie.js";

const router = express.Router();

router.route("/")
.get(customerController.getCustomers);

router.route("/me")
.get(validateAuthCookie(["customer"]), customerController.getCurrentCustomer)
.put(validateAuthCookie(["customer"]), customerController.updateCurrentCustomer);

router.route("/me/addresses")
.post(validateAuthCookie(["customer"]), customerController.addAddress);

router.route("/me/addresses/:addressId")
.put(validateAuthCookie(["customer"]), customerController.updateAddress)
.delete(validateAuthCookie(["customer"]), customerController.deleteAddress);

router.route("/:id")
.get(customerController.getCustomerById)
.put(customerController.updateCustomers)
.delete(customerController.deleteCustomers);

export default router;
