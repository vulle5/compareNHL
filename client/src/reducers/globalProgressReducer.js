export const toggleProgress = trueOrFalse => {
  return {
    type: 'SET_PROGRESS',
    data: trueOrFalse
  };
};

const globalProgressReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_PROGRESS':
      return action.data;
    default:
      return state;
  }
};

export default globalProgressReducer;
