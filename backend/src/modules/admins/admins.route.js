import express from "express";
import adminsController from "./admins.controller.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();

router.route("/")
.get(adminsController.getAdmins);

router.route("/:id")
.get(adminsController.getAdminById)
.put(upload.single("photo"), adminsController.updateAdmins)
.delete(adminsController.deleteAdmins);

export default router;
