import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCourses,
  clearEditingCourse,
} from "../../state/slices/courseSlice";
import { useLocation } from "react-router-dom";
import { message } from "antd";

function CourseForm() {
  const dispatch = useDispatch();
  const location = useLocation();

  const course = location.state?.course;
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setName(course.name);
      setCode(course.code);
      setCreditHours(course.creditHours);
    }
  }, [course]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Course name is required";
    if (!code) newErrors.code = "Course code is required";
    if (!creditHours) {
      newErrors.creditHours = "Credit hours are required";
    } else if (
      isNaN(creditHours) ||
      creditHours <= 0 ||
      !Number.isInteger(+creditHours)
    ) {
      newErrors.creditHours = "Credit hours must be a positive integer";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      //incase of new course addition
      if (!course) {
        const response = await fetch("http://localhost:3000/course/add", {
          method: "POST",
          body: JSON.stringify({ name, code, creditHours }),
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to add course: ${errorData.message}`);
        }
        if (response.ok) {
          message.success("Course added successfully");
        }
      }
      //incase of course editing
      else {
        console.log("in editing");
        const response = await fetch(
          `http://localhost:3000/course/${course._id}`,
          {
            method: "PUT",
            body: JSON.stringify({ name, code, creditHours }),
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to add course: ${errorData.message}`);
        }
        if (response.ok) {
          message.success("Course added successfully");
        }
      }

      dispatch(fetchCourses());
      dispatch(clearEditingCourse());
      setName("");
      setCode("");
      setCreditHours("");
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.name && <div className="text-red-500">{errors.name}</div>}

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Course code"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.code && <div className="text-red-500">{errors.code}</div>}

      <input
        type="number"
        value={creditHours}
        onChange={(e) => setCreditHours(e.target.value)}
        placeholder="Course credit hours"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.creditHours && (
        <div className="text-red-500">{errors.creditHours}</div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        {course ? "Update" : "Add"} Course
      </button>
    </form>
  );
}

export default CourseForm;
