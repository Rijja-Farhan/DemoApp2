import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asynchronous actions
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const result = await response.json();
      console.log(result)
      localStorage.setItem("user", JSON.stringify(result)); // Save to localStorage
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      localStorage.removeItem("user"); // Remove from localStorage
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Load from localStorage
 
};

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
       
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        
      });
  },
});

export default userSlice.reducer;
