import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  editingCourse: null, // To store the course being edited
};

const courseSlice = createSlice({
  name: 'courses',
  
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },
    setEditingCourse: (state, action) => {
      state.editingCourse = action.payload;
    },
    clearEditingCourse: (state) => {
      state.editingCourse = null;
    },
  },
});

export const { addCourse, updateCourse, deleteCourse, setEditingCourse, clearEditingCourse } = courseSlice.actions;
export default courseSlice.reducer;
