import express from "express";
import { Account } from "../models/Account.Model.js";
import { AuthMiddleware } from "../middleware.js";
import mongoose from "mongoose";
import { User } from "../models/User.Model.js";

const BalanceRouter = express.Router()
BalanceRouter.get("/balance",async(req,res)=>{
    console.log(req.userId)
const account = await Account.findOne({
    userId:req.userId
});
console.log(account)
 res.json({
        balance: account.balance
    })
})
BalanceRouter.post("/transfer",async(req,res)=>{
const session = await mongoose.startSession()

session.startTransaction()
const {amount,to} = req.body;
const account = await Account.findOne({userId:req.userId}).session(session)
if(!amount || account.balance<amount){
    await session.abortTransaction()
    return res.json({

        message:"inSufficient Balance"
    })
}
const ToAcc = await Account.findOne({userId:to}).session(session)
if(!ToAcc){
    await session.abortTransaction()

    return res.json({
        message:"Invalid USer"
    })
}
await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
  await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})
export default BalanceRouter