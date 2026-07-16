import express from "express";
import recoveryPasswordAdminsController from "./recoveryPasswordAdmins.controller.js";

const router = express.Router();

router.route("/request").post(recoveryPasswordAdminsController.requestRecovery);
router.route("/reset").post(recoveryPasswordAdminsController.resetPassword);

export default router;
