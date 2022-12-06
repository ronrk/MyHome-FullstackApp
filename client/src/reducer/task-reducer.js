const taskReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "END_LOADING") {
    return { ...state, loading: false };
  }
  if (action.type === "CREATE_NEW_TASK") {
    console.log(action.payload);
    return state;
  }
  if (action.type === "GET_ALL_TASKS") {
    console.log(action.payload);
    return { ...state, _tasks: action.payload, tasks: action.payload };
  }
  if (action.type === "EDIT_TASK") {
    console.log(action.payload);
    return state;
  }

  return state;
};

export default taskReducer;
