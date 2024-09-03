import { User } from "../models/User.js";
import { Course } from "../models/Course.js";

export const studentCourseAdd = async (req, res) => {
  const { courseId } = req.body;
  const { userId } = req.params;

  try {
    if (!courseId) {
      return res
        .status(400)
        .json({ status: false, message: "Select a course to add" });
    }

    const courseExists = await Course.exists({ _id: courseId });
    if (!courseExists) {
      return res
        .status(404)
        .json({ status: false, message: "Course not found" });
    }

    const student = await User.findOne({ _id: userId, role: "student" });
    if (!student) {
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    }

    if (!student.courses.includes(courseId)) {
      student.courses.push(courseId);
      await student.save();
      return res
        .status(201)
        .json({
          status: true,
          message: `Course ${courseId} for student ${userId} is added`,
        });
    } else {
      return res
        .status(400)
        .json({
          status: false,
          message: "Course is already added for the student",
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "An error occurred while adding the course",
        error: error.message,
      });
  }
};

export const studentCourseView = async (req, res) => {
  const { userId } = req.params;
  try {
    const studentWithCourses = await User.findOne({ _id: userId }).populate(
      "courses"
    );
    return res.json(studentWithCourses);
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "An error occurred while viewing courses",
      });
  }
};

//delete student course
export const studentCourseDelete = async (req, res) => {
  const { userId, courseId } = req.params;
  console.log("userId: ", userId);
  console.log("courseId: ", courseId);

  try {
    console.log(userId);
    const student = await User.findById(userId);
    console.log(student);
    if (!student) {
      return res
        .status(500)
        .json({ status: false, mesaage: "Student not found" });
    }

    if (!student.courses.includes(courseId)) {
      return res
        .status(500)
        .json({ status: false, message: "course  not found" });
    }

    student.courses = student.courses.filter(
      (course) => course.toString() !== courseId
    );
    await student.save();
    return res.json({
      status: true,
      message: "Course removed from student's courses",
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "An error occurred while deleting courses",
      });
  }
};
