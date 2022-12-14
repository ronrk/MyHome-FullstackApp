const taskReducer = (state, action) => {
  if (action.type === "GET_ALL_TASKS") {
    return { ...state, _tasks: action.payload, tasks: action.payload };
  }

  return state;
};

export default taskReducer;
