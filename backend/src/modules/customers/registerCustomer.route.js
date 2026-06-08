import express, { Router } from "express";
import registerCustomersController from "./registerCustomer.controller.js";
const router = express.Router();

router.route("/").post(registerCustomersController.register);
router.route("/verifyCodeEmail").post(registerCustomersController.verifyCode);

export default router;
// Este es como un subEndpoint