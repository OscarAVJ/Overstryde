import express from "express";
import recoverPasswordController from "./recoveryPassword.controller.js";

const router = express.Router();

router.route("/request").post(recoverPasswordController.requestRecovery);

router.route("/reset").post(recoverPasswordController.resetPassword);

export default router;