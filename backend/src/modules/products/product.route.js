import {Router} from "express"
import productController from "./products.controller.js"
import uploadImageToFolder from "../../utils/cloudinaryConfig.js"
const productRouter = Router()
productRouter.route("/").get(productController.getProducts).post(uploadImageToFolder("products").array("images", 5),productController.insertProduct)
productRouter.route("/:id").get(productController.getProductById).put(uploadImageToFolder("products").array("images", 5), productController.updateProduct).delete(productController.deleteProduct)

export default productRouter
