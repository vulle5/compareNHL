import contentService from '../services/content';
import axios from 'axios';

const fetchHighlights = async (source, gamePk) => {
  const { highlights } = await contentService.getContent(gamePk, source);
  return highlights.scoreboard.items;
};

export const fetchGameHighlights = gamePk => async dispatch => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const results = await fetchHighlights(source, gamePk);
  dispatch({
    type: 'SET_GOALS',
    data: results
  });
};

const gameHighlightReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GOALS':
      return action.data;
    default:
      return state;
  }
};

export default gameHighlightReducer;
