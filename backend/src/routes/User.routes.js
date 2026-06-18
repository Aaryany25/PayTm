import express from "express"

 const  UserRouter = express.Router()

UserRouter.get("/Aryan",(req,res)=>{
    res.send("Hello I am Working Fine")
})

export default UserRouter