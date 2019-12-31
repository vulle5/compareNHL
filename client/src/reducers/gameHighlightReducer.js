import contentService from '../services/content';

const fetchHighlights = async gamePk => {
  try {
    const { highlights, media } = await contentService.getContent(gamePk);
    const { items } = media.epg.find(media => media.title === 'Recap');
    const { playbacks } = items.find(item => item.type === 'video');
    const { url } = playbacks.find(video => video.name.includes('FLASH_1800K'));
    return {
      recap: url,
      goalHighlights: highlights.scoreboard.items,
      fetching: false
    };
  } catch (error) {
    return { recap: null, goalHighlights: null, fetching: false };
  }
};

export const fetchGameHighlights = gamePk => async dispatch => {
  dispatch({
    type: 'SET_GOALS',
    data: { recap: null, goalHighlights: null, fetching: true }
  });
  const results = await fetchHighlights(gamePk);
  dispatch({
    type: 'SET_GOALS',
    data: results
  });
};

const gameHighlightReducer = (
  state = { recap: null, goalHighlights: null, fetching: false },
  action
) => {
  switch (action.type) {
    case 'SET_GOALS':
      return action.data;
    default:
      return state;
  }
};

export default gameHighlightReducer;
