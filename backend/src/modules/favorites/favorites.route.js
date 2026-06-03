import favoritesController from "./favorites.controller.js"
import express from "express"

const router = express.Router();

router.route("/")
.get(favoritesController.getFavorites)
.post(favoritesController.postFavorite)

router.route("/:id")
.put(favoritesController.updateFavorites)
.delete(favoritesController.deleteFavorites)

router.route("/byCustomer/:id")
.get(favoritesController.getByCustomerId)

export default router;