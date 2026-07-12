import favoritesController from "./favorites.controller.js"
import express from "express"
import { validateAuthCookie } from "../../middlewares/validateAuthCookie.js"

const router = express.Router();

router.route("/")
.get(favoritesController.getFavorites)
.post(favoritesController.postFavorite)

router.route("/me")
.get(validateAuthCookie(["customer"]), favoritesController.getMyFavorites)

router.route("/me/products/:productId")
.post(validateAuthCookie(["customer"]), favoritesController.addMyFavorite)
.delete(validateAuthCookie(["customer"]), favoritesController.removeMyFavorite)

router.route("/:id")
.put(favoritesController.updateFavorites)
.delete(favoritesController.deleteFavorites)

router.route("/byCustomer/:id")
.get(favoritesController.getByCustomerId)

export default router;
