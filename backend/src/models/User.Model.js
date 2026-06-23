import mongoose ,{Schema}from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
username:{
    type:String,
    minLength:3,
    maxLength:100,
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
    type:String,
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
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next;
    // Hashing the password
    this.password = await bcrypt.hash(this.password,10)
    next
})
export const User =mongoose.model('User',userSchema)