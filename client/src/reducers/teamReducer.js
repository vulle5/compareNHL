import teamService from '../services/teams';

export const initializeTeams = () => {
  return async dispatch => {
    const { teams } = await teamService.getTeams();
    dispatch({
      type: 'INIT_TEAMS',
      data: teams
    });
  };
};

const teamReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_TEAMS':
      return action.data;
    default:
      return state;
  }
};

export default teamReducer;
