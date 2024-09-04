import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await fetch("http://localhost:3000/course/list");
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const result = await response.json();
    return result; // Assuming the API returns an array of courses
  }
);

// Thunk to fetch student-specific courses
export const fetchStudentCourses = createAsyncThunk(
  'courses/fetchStudentCourses', 
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.user.user;

    console.log("Fetching student courses...");
   
    try {
      const response = await fetch(
        `http://localhost:3000/student/${user.id}/courseview`
      );
      if (response.ok) {
        const data = await response.json();
        return data.courses; 
      } else {
        return thunkAPI.rejectWithValue('Failed to fetch student courses');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Load initial state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('coursesState');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
    return {
      courses: [],
      loading: false,
      error: null,
      studentCourses: [], 
    };
  } catch (error) {
    return {
      courses: [],
      loading: false,
      error: null,
      studentCourses: [], 
    };
  }
};

const initialState = loadStateFromLocalStorage();

const courseSlice = createSlice({
  name: "courses",
  initialState,
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
        localStorage.setItem('coursesState', JSON.stringify(state)); // Save state to localStorage
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStudentCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.studentCourses = action.payload;
        localStorage.setItem('coursesState', JSON.stringify(state)); // Save state to localStorage
      })
      .addCase(fetchStudentCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setEditingCourse, clearEditingCourse } = courseSlice.actions;
export default courseSlice.reducer;
