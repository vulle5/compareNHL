import axios from 'axios';

export const initializeGame = gamePk => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/game/${gamePk}/feed/live`
    );
    dispatch({
      type: 'INIT_GAME',
      data: data
    });
  } catch (error) {
    dispatch({
      type: null,
      data: error.message
    });
  }
};

const gameDetailReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_GAME':
      return action.data;
    case 'ERROR':
      return { errorMessage: action.data };
    default:
      return state;
  }
};

export default gameDetailReducer;
