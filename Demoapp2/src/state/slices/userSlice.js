import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null, // Assuming user is an object containing user details
  status: 'idle',
  error: null,
  userRole: null,
  userId: null
};

// Async thunk for user login
export const loginUser = createAsyncThunk('user/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const result = await response.json();
    return result; // Return result to be used in fulfilled case
  } catch (error) {
    return rejectWithValue(error.message); // Handle errors
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Optional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Save user details
        state.userId = action.payload.userId; // Ensure this matches your API response
        state.userRole = action.payload.role; // Ensure this matches your API response
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
