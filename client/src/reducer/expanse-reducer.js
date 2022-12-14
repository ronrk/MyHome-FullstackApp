const expanseReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "END_LOADING") {
    return { ...state, loading: false };
  }
  if (action.type === "GET_ALL_EXPANSES") {
    return {
      ...state,
      _expanses: action.payload,
      expanses: action.payload.slice(0, 5),
    };
  }
  if (action.type === "GET_EXPENSES_BY_DATE") {
    const { expansesByDate, lastYearExpenses } = action.payload;
    return {
      ...state,
      lastYearExpanses: lastYearExpenses[0],
      lastMonthsExpanses: expansesByDate,
    };
  }
  if (action.type === "HANDLE_GET_EXPANSES") {
    console.log(action.payload);
    let newExpanses = [];
    if (action.payload === 0) {
      newExpanses = [...state._expanses];
    } else {
      newExpanses = state._expanses.slice(0, action.payload);
    }
    return { ...state, expanses: newExpanses };
  }

  return state;
};

export default expanseReducer;
