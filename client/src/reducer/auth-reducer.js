const authReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return { ...state, isaLoading: true };
  }
  if (action.type === "END_LOADING") {
    return { ...state, isaLoading: false };
  }
  if (action.type === "USER_REGISTER") {
    return { ...state, user: action.payload, isAuth: true };
  }

  if (action.type === "USER_LOGIN") {
    return { ...state, user: action.payload, isAuth: true };
  }

  if (action.type === "LOGOUT_USER") {
    return { ...state, user: null };
  }

  if (action.type === "SET_ERROR") {
    return { ...state, error: { status: true, message: action.payload } };
  }
  if (action.type === "INITIAL_ERROR") {
    return { ...state, error: { status: false, message: "" } };
  }

  return state;
};

export default authReducer;
