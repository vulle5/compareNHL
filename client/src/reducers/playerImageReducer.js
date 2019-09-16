import playerServices from '../services/player';

export const initializePlayerImage = playerId => {
  return async dispatch => {
    dispatch({ type: 'LOADING' })
    const response = await playerServices.getImage(playerId, {
      responseType: 'arraybuffer'
    });
    const data = new Buffer.from(response, 'binary').toString('base64');
    dispatch({
      type: 'SET_IMAGE',
      data
    });
  };
};

const playerImageReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOADING':
    return null;
  case 'SET_IMAGE':
    return action.data;
  default:
    return state;
  }
};

export default playerImageReducer;
