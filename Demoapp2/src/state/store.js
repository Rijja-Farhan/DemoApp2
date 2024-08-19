import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';

import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    
    user: userReducer
  },
});

export default store;
