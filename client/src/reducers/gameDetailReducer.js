export const setSelected = gamePk => (dispatch, getState) => {
  const selected = getState().gameDetail?.games?.[gamePk];
  if (selected) {
    dispatch({
      type: 'SET_GAME',
      data: selected.gamePk
    });
  }
};

export const updateGame = data => {
  return {
    type: 'UPDATE_GAME',
    data
  };
};

export const setErrorMessage = () => {
  return {
    type: 'ERROR',
    data: true
  };
};

const gameDetailReducer = (state = { selected: null, games: null }, action) => {
  switch (action.type) {
    case 'SET_GAME':
      return { ...state, selected: action.data };
    case 'UPDATE_GAME':
      return {
        selected: action.data.gamePk,
        games: { ...state.games, [action.data.gamePk]: action.data }
      };
    case 'ERROR':
      return { errorMessage: action.data };
    default:
      return state;
  }
};

export default gameDetailReducer;
