import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import reviewsRoute from "./src/modules/productReviews/productReviews.route.js"
import limiter from "./src/middlewares/rateLimit.js"
const app = express()
app.use(limiter)

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/productReviews", reviewsRoute)

export default app
