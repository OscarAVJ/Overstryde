import express from "express";
import loginCustomerController from "./loginCustomer.controller.js";   

const router = express.Router();

router.route("/").post(loginCustomerController.login);

export default router;