import { createAction, createReducer } from "@reduxjs/toolkit";

const initState = {
  users: [
    { name: "John1", id: "123" },
    { name: "John2", id: "122" },
    { name: "John3", id: "121" },
  ],
};

export const ADD_USER = createAction("ADD_USER");
export const REMOVE_USER = createAction("REMOVE_USER");
export const FETCH_USERS = createAction("FETCH_USERS");

export default createReducer(initState, {
  [FETCH_USERS]: (state, action) => {
    state.users = [...state.users, ...action.payload];
  },
  [ADD_USER]: (state, action) => {
    state.users = [...state.users, action.payload];
  },
  [REMOVE_USER]: (state, action) => {
    state.users = state.users.filter((user) => user.id !== action.payload);
  },
});
