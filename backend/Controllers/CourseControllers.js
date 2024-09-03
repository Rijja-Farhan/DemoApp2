import { Course } from "../models/Course.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//Add new Course
export const courseAdd = async (req, res) => {
 
  const { name, code, creditHours } = req.body;

  try {
    // Input validation can be added here
    if (!name || !code || !creditHours) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const courseExist = await Course.findOne({ code });
    if (courseExist) {
      return res
        .status(409)
        .json({ status: false, message: "Course already exists" });
    }

    const course = new Course({
      name,
      code,
      creditHours,
    });

    await course.save();
    return res
      .status(201)
      .json({ status: true, message: "Course added successfully" });
  } catch (error) {
    console.error("Error adding course:", error);
    return res
      .status(500)
      .json({
        status: false,
        message: "An error occurred while adding the course",
      });
  }
};

//View All courses
export const viewCourseList = async (req, res) => {

  try {
    const courses = await Course.find();
    return res.json(courses);
  } catch (error) {
    console.error("Error retrieving course list:", error);
    return res
      .status(500)
      .json({
        status: false,
        message: "An error occurred while retrieving the course list",
      });
  }
};

//delete course from course list
export const deleteCourse = async (req, res) => {
  const { courseid } = req.params;

  try {
    const course = await Course.findById(courseid);
    if (!course) {
      return res
        .status(404)
        .json({ status: false, message: "Course not found" });
    }

    await Course.findByIdAndDelete(courseid);
    return res
      .status(200)
      .json({ status: true, message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "an error occured" });
  }
};

//update course from course list by the admin
export const updateCourse = async (req, res) => {
  const { courseid } = req.params;
  const { name, code, creditHours } = req.body;

  try {
    const course = await Course.findById(courseid);
    if (!course) {
      return res
        .status(404)
        .json({ status: false, message: "Course not found" });
    }

    await Course.findByIdAndUpdate(courseid, { name, code, creditHours });
    return res.status(200).json({ status: true, message: "Course updated" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "an error occured" });
  }
};
