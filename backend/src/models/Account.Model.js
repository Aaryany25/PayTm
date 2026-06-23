import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    balance:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})
export const Account = mongoose.model("Account",AccountSchema)