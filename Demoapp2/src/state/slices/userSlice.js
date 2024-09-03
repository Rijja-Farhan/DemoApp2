import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const result = await response.json();
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

      const result = await response.json();
      return result; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);


// export const getUser = createAsyncThunk('user/getUser', async () => {
//  console.log("in get users")
//   try {
//     const response = await fetch('http://localhost:3000/auth/getUser', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//       },
//    credentials: 'include'
//     });

//     console.log(response);
//     if (!response.ok) {
//       throw new Error('Failed to fetch user details');
//     }

//     const result = await response.json();

//     return result; // Return result to be used in fulfilled case
//   } catch (error) {
//     console.log(error.message); // Handle errors
//   }
// });

const initialState = {
  user: null,
  status: "idle",
  error: null,
  userRole: null,
  userId: null,
  token: null,
};

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
        state.userId = action.payload.id;
        state.userRole = action.payload.role;
        state.token = action.payload.token;
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
        state.userId = null;
        state.userRole = null;
        state.token = null; 
      });
   
  },
});

export default userSlice.reducer;
