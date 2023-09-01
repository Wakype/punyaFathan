const initialState = {
  username: "",
  email: "",
  password: "",
  isAuth: false,
};

export const authProgress = (state = initialState, action) => {
  if (action.type === "login") {
    return {
      ...state,
      username: action.username,
      email: action.email,
      password: action.password,
      isAuth: action.isAuth,
    };
  }
  return state;
};
