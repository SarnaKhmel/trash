import { configureStore } from "@reduxjs/toolkit";
import planetSlice from "./slice";
import { authReducer } from "./slices/auth";

export const store = configureStore({
  reducer: {
    planets: planetSlice,
    auth: authReducer,
  },
});
