import { createStore, combineReducers } from "redux";
import { numberReducer } from "./numberReducer";
import { usersReducer } from "./usersReducer";

import { composeWithDevTools } from "@redux-devtools/extension";
const rootReducer = combineReducers({
  number: numberReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
