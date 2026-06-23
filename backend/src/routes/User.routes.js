import express from "express"
import {z} from "zod"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "../models/User.Model.js"
import { AuthMiddleware } from "../middleware.js"
 const  UserRouter = express.Router()


const SignUpBody = z.object({
    username:z.string().email(),
    password:z.string(),
    firstName:z.string(),
    lastName:z.string()
})

UserRouter.post("/signup",async(req,res)=>{
    console.log("Signup route hit");
    try {
       const {success} = SignUpBody.safeParse(req.body)
       if(!success){
        return res.status(400).json({
            message:"Incorrect inputs"
        })
       }
       const existingUser = await User.findOne({
        username:req.body.username
       })
       if(existingUser){
         return res.status(409).json({
            message:"Email Already Taken"
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

        return res.json({
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})
const SignInBody =z.object({
    username:z.string().email(),
    password:z.string(),

})
UserRouter.post("/signin",async(req,res)=>{
    try {
       const {success} = SignInBody.safeParse(req.body)
       if(!success){
           return res.status(400).json({
                message: "Incorrect inputs"
            })
       }
       const user = await User.findOne({
        username:req.body.username
       })
       if(user){
         const isValidPassword = await bcrypt.compare(req.body.password, user.password)
         if (isValidPassword) {
             const token = jwt.sign({
                 userId: user._id
             }, process.env.JWT_SECRET);
       
             return res.json({
                 token: token
             })
         }
       }
       return res.status(401).json({
            message: "Error while logging in"
        })
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})
UserRouter.get("/me",AuthMiddleware,async(req,res)=>{
    const user = await User.findOne({
        _id:req.userId
    })
    return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.username
    })
})

const UpdateBody = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})
UserRouter.put("/update",AuthMiddleware,async(req,res)=>{
    
         const {success} = UpdateBody.safeParse(req.body)
         if(!success){
            return   res.status(411).json({
            message: "Error while updating information"
          
        })
         }
         	await User.updateOne({ _id: req.userId }, req.body);
              res.json({
        message: "Updated successfully"
    })
})

UserRouter.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";
     const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$option":"i"
            }
        }, {
            lastName: {
                "$regex": filter,
                "$option":"i"
            }
        }]
    })
     res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
export default UserRouter