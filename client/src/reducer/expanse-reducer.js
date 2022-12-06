const expanseReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "END_LOADING") {
    return { ...state, loading: false };
  }
  if (action.type === "CREATE_NEW_EXPANSE") {
    console.log(action.payload);
    return state;
  }
  if (action.type === "GET_ALL_EXPANSES") {
    console.log(action.payload);
    return { ...state, _expanses: action.payload, expanses: action.payload };
  }
  if (action.type === "EDIT_EXPANSE") {
    console.log(action.payload);
    return state;
  }

  return state;
};

export default expanseReducer;
