import express from "express";
import adminsController from "./admins.controller.js";

const router = express.Router();

router.route("/")
.get(adminsController.getAdmins);

router.route("/:id")
.get(adminsController.getAdminById)
.put(adminsController.updateAdmins)
.delete(adminsController.deleteAdmins);

export default router;