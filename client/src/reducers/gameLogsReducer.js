import playerServices from '../services/player';
import { toggleProgress } from '../reducers/globalProgressReducer';

export const setRegularSeasons = (playerId, currentSeason) => {
  return async dispatch => {
    dispatch(toggleProgress(true));
    const {
      stats: {
        0: { splits }
      }
    } = await playerServices.getPlayer(
      playerId,
      `logs?stats=gameLog&expand=stats.team&season=${currentSeason}`
    );
    dispatch(toggleProgress(false));
    dispatch({
      type: 'SET_REG_LOGS',
      data: splits
    });
  };
};

export const setPlayoffSeasons = (playerId, currentSeason) => {
  return async dispatch => {
    const {
      stats: {
        0: { splits }
      }
    } = await playerServices.getPlayer(
      playerId,
      `logs?stats=playoffGameLog&expand=stats.team&season=${currentSeason}`
    );
    dispatch({
      type: 'SET_PLAYOFF_LOGS',
      data: splits
    });
  };
};

const gameLogsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_REG_LOGS':
      return { ...state, regular: action.data };
    case 'SET_PLAYOFF_LOGS':
      return { ...state, playoff: action.data };
    default:
      return state;
  }
};

export default gameLogsReducer;
