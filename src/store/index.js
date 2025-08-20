import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "./userTypeSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    userType: userTypeReducer,
    auth: authReducer,
  },
});
