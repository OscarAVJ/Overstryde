import reviewsController from "./productReviews.controller.js"
import express from "express";

const router = express.Router();

router.route("/")
.post(reviewsController.postReview)
.get(reviewsController.getReviews)

router.route("/:id")
.put(reviewsController.updateReview)
.delete(reviewsController.deleteReview)

export default router;