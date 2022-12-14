const userReducer = (state, action) => {
  if (action.type === "SET_USER") {
    return { ...state, user: action.payload };
  }
  if (action.type === "SET_USER_PROFILE") {
    return { ...state, userProfile: action.payload };
  }
  return state;
};

export default userReducer;
