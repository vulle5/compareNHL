export const toggleDialog = (bool, src) => {
  return {
    type: 'TOGGLE',
    data: { bool, src }
  };
};
const dialogReducer = (state = { status: false, src: null }, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return { status: action.data.bool, src: action.data.src };
    default:
      return state;
  }
};

export default dialogReducer;
