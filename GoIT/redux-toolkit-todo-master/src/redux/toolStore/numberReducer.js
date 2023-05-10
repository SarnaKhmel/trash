import { createAction, createReducer } from "@reduxjs/toolkit";

const initState = {
  numbers: 0,
};

export const increment = createAction("INCREMENT");
export const decrement = createAction("DECREMENT");

export default createReducer(initState, {
  [increment]: (state, { payload }) => {
    state.numbers = state.numbers + payload;
  },
  [decrement]: (state, { payload }) => {
    state.numbers = state.numbers - payload;
  },
});
