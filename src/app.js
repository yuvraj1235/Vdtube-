import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthcheck.routes.js"
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js'
import { errorHandler } from "./middlewares/error.middlewares.js";
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    
    credentials:true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use("/api/v1/healthcheck",healthCheckRouter)
app.use("/api/v1/users",userRouter)
app.use(errorHandler)
export {app}