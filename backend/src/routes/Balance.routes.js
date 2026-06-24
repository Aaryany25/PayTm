import express from "express";
import { Account } from "../models/Account.Model";
import { AuthMiddleware } from "../middleware";
import mongoose from "mongoose";
import { User } from "../models/User.Model";

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
const session = await mongoose.startSession()

session.startTransaction()
const {amount,to} = req.boody;
const account = await Account.findOne({userId:req.userId}).session(session)
if(!amount || account.balance<amount){
    await session.abortTransaction()
    return res.json({

        message:"inSufficient Balance"
    })
}

const ToAccount =await User.findOne({userId:to}).session(session)

if(!ToAccount){
    await session.abortTransaction()

    return res.json({
        message:"Invalid USer"
    })
}
await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
await Accoount.updateOne({userId:ToAccount},{$inc:{balance:amount}}).session(session)
  await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})
export default BalanceRouter