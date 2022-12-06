const authReducer = (state, action) => {
  if (action.type === "USER_REGISTER") {
    return { ...state, user: action.payload };
  }

  if (action.type === "USER_LOGIN") {
    return { ...state, user: action.payload };
  }
  return state;
};

export default authReducer;
