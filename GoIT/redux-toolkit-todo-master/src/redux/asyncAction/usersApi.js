import { FETCH_USERS } from "../toolStore/usersReducer";

export const fetchUsers = (dispatch) => {
  return function (dispatch) {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => dispatch(FETCH_USERS(json)));
  };
};
