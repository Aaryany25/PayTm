import express from "express"
import UserRouter from "./User.routes.js"
export const Router = express.Router()
Router.use("/user",UserRouter)

