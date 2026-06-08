import express from "express";
import loginAdminsController from "./loginAdmins.controller.js";   

const router = express.Router();

router.route("/").post(loginAdminsController.login);

export default router;