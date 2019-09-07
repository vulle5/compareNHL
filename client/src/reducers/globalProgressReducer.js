export const toggleProgress = trueOrFalse => {
  if (!typeof trueOrFalse === "boolean") {
    return {
      type: "NO_TYPE"
    };
  }
  return {
    type: "SET_PROGRESS",
    data: trueOrFalse
  };
};

const globalProgressReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_PROGRESS":
      return action.data;
    default:
      return state;
  }
};

export default globalProgressReducer;
