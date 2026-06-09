import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import productRouter from "./src/modules/products/product.route.js"
import reviewsRoute from "./src/modules/productReviews/productReviews.route.js"
import cartRouter from "./src/modules/cart/cart.route.js"
import ordersRouter from "./src/modules/orders/orders.route.js"
import limiter from "./src/middlewares/rateLimit.js"
import favoritesRoute from "./src/modules/favorites/favorites.route.js"
import bannerRouter from "./src/modules/banners/banner.route.js"
import categoriesRouter from "./src/modules/categories/categories.route.js"
const app = express()
app.use(limiter)

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/products", productRouter)
app.use("/api/productReviews", reviewsRoute)
app.use("/api/cart", cartRouter)
app.use("/api/orders", ordersRouter)
app.use("/api/favorites", favoritesRoute)
app.use("/api/banners", bannerRouter)
app.use("/api/categories", categoriesRouter)

export default app
