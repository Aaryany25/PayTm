import express from "express";
import { Account } from "../models/Account.Model";
import { AuthMiddleware } from "../middleware";

const BalanceRouter = express.Router()
BalanceRouter.get("/balance",async(res,res)=>{
const account = await Account.findOne({
    userId=req.userId
});
 res.json({
        balance: account.balance
    })
})
BalanceRouter.post("/transfer",async(req,res)=>{

})
export default BalanceRouter