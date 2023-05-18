import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import darkModeReducer from "./darkMode";
const store = configureStore({
  reducer: {
    authSlice: authReducer,
    darkModeSlice: darkModeReducer,
  },
});
export default store;
