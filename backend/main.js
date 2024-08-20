import express from "express"
import {User} from './models/User.js'
import {Course} from './models/Course.js'
import bcrypt from 'bcrypt'
import { mongoose } from "mongoose"

import cors from 'cors'
import dotenv from 'dotenv';

const app =  express()
const port =3000

app.use(express.json())
app.use(cors())
dotenv.config();
const connectionString = process.env.MONGO_URI;

//mongo db connection:
let connection = await mongoose.connect(connectionString);
app.get('/',(req,res)=>{
    res.json({message:"get request"})
})


app.post('/signup',async(req,res)=>{
    const {email,
    password,
    username,
    role} = req.body
  

   try{ const userExist = await User.findOne({email})
    if(userExist)
    {
        return res.json({message:"User already registered"})

    }

    //hasing the password
    const hashPassword =  await bcrypt.hash(password,10)
    

    //creating new user
    const user = new User({
        username,
        email,
        password:hashPassword,
        role

    })
    await user.save()
    return res.json({status:true,message:"User registeres"})
}
catch(error)
{
    return res.status(500).json({status:false,message:"an error occured"})
}
})

app.post('/login',async(req,res)=>{
    const {email,
        password,
        
        role} = req.body

    try{const user = await User.findOne({email})

    if(!user)
    {
        return res.status(401).json({message:"User is not registered"})
    }
    const validPassword= await bcrypt.compare(password,user.password)
    if(!validPassword)
    {
        return res.status(401).json({message:"Password is incorrect"})
    }
    return res.json({status:true,message:"Login Successfull",role:user.role})

}



   

    

catch(error)
{
    return res.status(500).json({status:false,message:"an error occured"})
}
})
app.get('/',(req,res)=>{
    res.json({message:"get request"})
})


app.post('/course/add',async(req,res)=>{
    const {name,
        code,
        
        creditHours} = req.body
    

   try{ const courseExist = await Course.findOne({code})
    if(courseExist)
    {
        return res.json({message:"Course is already added"})

    }

    

    //creating new course
    const course = new Course({
       name,
        code,
        creditHours

    })
    await course.save()
    return res.json({status:true,message:"course added"})
}
catch(error)
{
    return res.status(500).json({status:false,message:"an error occured"})
}
})


app.get('/course/list',async (req,res)=>{
  try{
const course = await Course.find()
res.json(course)
  }
  catch(error)
  {

  }
})

app.delete('/course/:courseid',async(req,res)=>{

   const  {courseid} =req.params
  
    try{
        const course = await Course.findById(courseid)
        if (!course)
        {
            return res.status(404).json({ status: false, message: "Course not found" });
        }

        await Course.findByIdAndDelete(courseid)
        return res.status(200).json({ status: true, message: "Course deleted successfully" });

    }
    catch(error)
    {
        return res.status(500).json({status:false,message:"an error occured"})
    }
})
app.put('/course/:courseid',async(req,res)=>{

    const  {courseid} =req.params
    const {name,code,creditHours} = req.body
    
     try{
         const course = await Course.findById(courseid)
         if (!course)
         {
             return res.status(404).json({ status: false, message: "Course not found" });
         }
 
         await Course.findByIdAndUpdate(courseid,{name,code,creditHours})
         return res.status(200).json({ status: true, message: "Course updated" });
 
     }
     catch(error)
     {
         return res.status(500).json({status:false,message:"an error occured"})
     }
 })



app.get('/signup',(req,res)=>{
    res.json({message:"get request of sign up"})
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
