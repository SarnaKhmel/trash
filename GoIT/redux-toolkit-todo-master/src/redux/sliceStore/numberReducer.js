import { createSlice } from "@reduxjs/toolkit";

export const numbers = createSlice({
  name: "number",
  initialState: 0,
  reducers: {
    increment: (state, { payload }) => state + payload,
    decrement: (state, { payload }) => state - payload,
  },
});

export const numbersReducer = numbers.reducer;
export const { increment, decrement } = numbers.actions;
