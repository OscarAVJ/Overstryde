import express from "express";

import registerAdminsController from "./registerAdmins.controller.js";

import upload from "../../middlewares/multer.js";

const router = express.Router();

router.route("/")
.post(
    upload.single("photo"),
    registerAdminsController.register
);

router.route("/verifyCodeEmail")
.post(
    registerAdminsController.verifyCode
);

export default router;