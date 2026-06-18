// const express = require('express')
// import express from "express"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/db.js"
dotenv.config()
const app = express()

connectDB().then(()=>{
app.listen(3000,()=>{
    console.log("server is Started")
})
})
.catch((error)=>{
    console.log("mongoDb Connection failed",error)

})
app.get("/",(req,res)=>{
    res.json("message We are live")
})