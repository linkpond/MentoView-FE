import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import interviewReducer from './interviewSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
  },
});

export default store;
