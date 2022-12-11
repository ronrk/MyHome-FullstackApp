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
    return {
      ...state,
      _expanses: action.payload,
      expanses: action.payload.slice(0, 5),
    };
  }
  if (action.type === "GET_EXPENSES_BY_DATE") {
    console.log(action.payload);
    const { expansesByDate, lastYearExpenses } = action.payload;
    return {
      ...state,
      lastYearExpanses: lastYearExpenses[0],
      lastMonthsExpanses: expansesByDate,
    };
  }
  if (action.type === "EDIT_EXPANSE") {
    console.log(action.payload);
    return state;
  }

  if (action.type === "HANDLE_GET_EXPANSES") {
    console.log(action.payload);
    let newExpanses = [];
    if (action.payload === 0) {
      newExpanses = [...state._expanses];
    } else {
      newExpanses = state._expanses.slice(0, action.payload);
    }

    console.log(state._expanses);
    console.log(newExpanses);
    return { ...state, expanses: newExpanses };
  }

  return state;
};

export default expanseReducer;
