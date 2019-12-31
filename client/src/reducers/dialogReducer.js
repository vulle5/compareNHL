export const toggleDialog = (bool, src, title) => {
  return {
    type: 'TOGGLE',
    data: { bool, src, title }
  };
};
const dialogReducer = (
  state = { bool: false, src: null, title: '' },
  action
) => {
  switch (action.type) {
    case 'TOGGLE':
      return { ...action.data };
    default:
      return state;
  }
};

export default dialogReducer;
