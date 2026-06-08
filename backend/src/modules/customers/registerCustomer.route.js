import express from "express";

import registerCustomersController
from "./registerCustomer.controller.js";

import upload from "../../middlewares/multer.js";

const router = express.Router();

router.route("/")
.post(
    upload.single("photo"),
    registerCustomersController.register
);

router.route("/verifyCodeEmail")
.post(
    registerCustomersController.verifyCode
);

export default router;