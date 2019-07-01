export const setFilter = (filter, key) => {
  return {
    type: "SET_FILTER",
    data: { [key]: filter }
  };
};

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default filterReducer;
