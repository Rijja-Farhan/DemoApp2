import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

    username:String,
    email:String,
    password:String,
    confirmPassword:String,
    role:String

})

export const User = mongoose.model('Users',UserSchema)