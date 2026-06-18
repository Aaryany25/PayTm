import express from "express"
import {z} from "zod"
import jwt from "jsonwebtoken"
import { User } from "../models/User.Model.js"
 const  UserRouter = express.Router()


const SignUpBody = z.object({
    username:z.string().email(),
    password:z.string(),
    firstName:z.string(),
    lastName:z.string()
})

UserRouter.post("/signup",async(req,res)=>{
   const {success} = SignUpBody.safeParse(req.body)
   if(!success){
    return res.status(411).json({
        message:"Email Already Taken/Incorrect Inputs"
    })
   }
   const existingUser = await User.findOne({
    username:req.body.username
   })
   if(existingUser){
     return res.status(411).json({
        message:"Email Already Taken/Incorrect Inputs"
    })
   }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id
    const token =jwt.sign({
        userId
    },process.env.JWT_SECRET)

     res.json({
        message: "User created successfully",
        token: token
    })
})
const SignInBody =z.object({
    username:z.string().email(),
    password:z.string(),

})
UserRouter.post("/signin",async(req,res)=>{
   const {success} = SignInBody.safeParse(body.req)
   if(!success){
       return res.status(411).json({
            message: "Incorrect inputs"
        })
   }
   const user = await User.findOne({
    username:req.body.username,
    password:req.body.password
   })
   if(user){
     const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
   }
      res.status(411).json({
        message: "Error while logging in"
    })
})


export default UserRouter