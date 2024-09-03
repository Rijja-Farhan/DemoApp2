import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  message } from "antd";


export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await fetch("http://localhost:3000/course/list");
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const result = await response.json();
    return result;
  }
);


export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course, { dispatch }) => {
    const { id, name, code, creditHours } = course;

    try {
      const response = await fetch(`http://localhost:3000/course/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          code,
          creditHours,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update course");
      } else {
        message.success("Course updated successfully");
      }
      const result = await response.json();

     
      await dispatch(fetchCourses());

      return result;
    } catch (error) {
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
    editingCourse: null,
  },
  reducers: {
    setEditingCourse: (state, action) => {
      state.editingCourse = action.payload;
    },
    clearEditingCourse: (state) => {
      state.editingCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const updatedCourse = action.payload;
        state.courses = state.courses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course
        );
        state.loading = false;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setEditingCourse, clearEditingCourse } = courseSlice.actions;
export default courseSlice.reducer;
