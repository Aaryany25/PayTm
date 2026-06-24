import express from "express"
import UserRouter from "./User.routes.js"
import BalanceRouter from "./Balance.routes.js"
import { AuthMiddleware } from "../middleware.js"
export const Router = express.Router()
Router.use("/user",UserRouter)
Router.use("/account",AuthMiddleware,BalanceRouter)

