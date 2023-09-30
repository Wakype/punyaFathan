const initialState = {
  nama: "",
  email: "",
  role: "",
  isAuth: false,
};

export const authProgress = (state = initialState, action) => {
  if (action.type === "login") {
    return {
      ...state,
      nama: action.nama,
      email: action.email,
      role: action.role,
      isAuth: action.isAuth,
    };
  }
  return state;
};
