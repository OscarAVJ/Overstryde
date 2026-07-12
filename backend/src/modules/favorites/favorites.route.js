import favoritesController from "./favorites.controller.js"
import express from "express"

const router = express.Router();

router.route("/")
.get(favoritesController.getFavorites)
.post(favoritesController.postFavorite)

router.route("/me")
.get(favoritesController.getMyFavorites)

router.route("/me/products/:productId")
.post(favoritesController.addMyFavorite)
.delete(favoritesController.removeMyFavorite)

router.route("/:id")
.put(favoritesController.updateFavorites)
.delete(favoritesController.deleteFavorites)

router.route("/byCustomer/:id")
.get(favoritesController.getByCustomerId)

export default router;
