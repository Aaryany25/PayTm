import mongoose ,{Schema}from "mongoose";

const userSchema = new Schema({
username:{
    type:String,
    minLength:3,
    maxLength:10,
    required:true,
    trim:true,
    unique:true,
    lowercase:true
},
password:{
    type:String,
    required:true,
    minLength:6
},
firstName:{
    type:string,
      required: true,
        trim: true,
        maxLength: 50
},
lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

export const User =mongoose.model('User',userSchema)