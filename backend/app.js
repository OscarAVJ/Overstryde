import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import ordersRoute from "./src/modules/orders/orders.route.js"
import productRouter from "./src/modules/products/product.route.js"
import reviewsRoute from "./src/modules/productReviews/productReviews.route.js"
import cartRouter from "./src/modules/cart/cart.route.js"
import ordersRouter from "./src/modules/orders/orders.route.js"
import limiter from "./src/middlewares/rateLimit.js"
import favoritesRoute from "./src/modules/favorites/favorites.route.js"
import customerRoutes from "./src/modules/customers/customer.route.js"
import registerCustomersRoutes from "./src/modules/customers/registerCustomer.route.js"
import logoutRoutes from "./src/modules/login/logout.route.js"
import loginCustomerRoutes from "./src/modules/login/loginCustomer.route.js"
import loginAdminsRoutes from "./src/modules/login/loginAdmins.route.js"
const app = express()
app.use(limiter)

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/orders", ordersRoute)
app.use("/api/customers", customerRoutes);
app.use("/api/registerCustomers", registerCustomersRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/loginCustomer", loginCustomerRoutes);
app.use("/api/loginAdmins", loginAdminsRoutes);
app.use("/api/products", productRouter)
app.use("/api/productReviews", reviewsRoute)
app.use("/api/cart", cartRouter)
app.use("/api/orders", ordersRouter)
app.use("/api/favorites", favoritesRoute)

export default app
