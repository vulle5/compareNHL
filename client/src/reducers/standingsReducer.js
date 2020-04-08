import standingServices from '../services/standings';

const GET_GAMES = 'GET_GAMES';

export const getStandings = () => (
  async (dispatch) => {
    const res = await standingServices.getStandings();
    dispatch({
      type: GET_GAMES,
      data: res
    })
  }
)


const standingsReducer = (state = {}, action) => {
  switch (action.type) {
  case GET_GAMES:
    return action.data;
  default:
    return state;
  }
};

export default standingsReducer;

