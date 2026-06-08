import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import ordersRoute from "./src/modules/orders/orders.route.js"
const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/orders", ordersRoute)
export default app
