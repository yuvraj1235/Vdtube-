import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthcheck.routes.js"
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js'
const app=express()
app.use(cookieParser())
app.use(cors({
    // origin:process.env.CORS_ORIGIN,
    origin:"http://localhost:8000/api/v1/healthcheck",
    credentials:true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))

app.use("/api/v1/healthcheck",healthCheckRouter)

app.use("/api/v1/users",userRouter)
export {app}