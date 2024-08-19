import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: 'user', 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    switchRole: (state) => {
      
      state.role = state.role === 'user' ? 'admin' : 'user';
    },
  },
});

export const { switchRole } = userSlice.actions;
export default userSlice.reducer;
