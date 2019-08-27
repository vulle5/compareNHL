export const setFilter = (filter, key) => {
  return {
    type: "SET_FILTER",
    data: { [key]: filter }
  };
};

export const reset = () => {
  return {
    type: "RESET"
  };
};

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, ...action.data };
    case "RESET":
      return {};
    default:
      return state;
  }
};

export default filterReducer;
