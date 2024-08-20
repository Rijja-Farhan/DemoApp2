import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({

    name:String,
    code:String,
    creditHours:Number

})

export const Course = mongoose.model('Course',CourseSchema)