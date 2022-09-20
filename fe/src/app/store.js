import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});
