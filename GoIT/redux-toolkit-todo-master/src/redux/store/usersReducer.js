const defaultState = {
  users: [
    { name: "John1", id: "123" },
    { name: "John2", id: "122" },
    { name: "John3", id: "121" },
  ],
};

const ADD_USER = "ADD_USER";
const REMOVE_USER = "REMOVE_USER";

export const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export const addUser = (payload) => ({ type: "ADD_USER", payload: payload });
export const removeUser = (payload) => ({
  type: "REMOVE_USER",
  payload: payload,
});
