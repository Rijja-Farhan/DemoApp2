import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';
import userReducer from './slices/userSlice';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  courses: courseReducer,
  user: userReducer,
});


export const store = configureStore({
  reducer: rootReducer,
});

