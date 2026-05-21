import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

export default app
