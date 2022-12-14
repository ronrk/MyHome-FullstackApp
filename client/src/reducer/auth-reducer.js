const authReducer = (state, action) => {
  if (action.type === "USER_REGISTER") {
    return { ...state, user: action.payload, isAuth: true };
  }

  if (action.type === "USER_LOGIN") {
    return { ...state, user: action.payload, isAuth: true };
  }

  if (action.type === "LOGOUT_USER") {
    return { ...state, user: null };
  }

  return state;
};

export default authReducer;
