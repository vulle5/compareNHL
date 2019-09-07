import playerServices from "../services/player";
import { genPlayer } from "../functions/genPlayer";
import { reset } from "../reducers/filterReducer";

export const initializePlayer = playerId => {
  return async dispatch => {
    dispatch(reset());
    dispatch({ type: "LOADING" });
    try {
      const {
        people: { 0: playerResponse }
      } = await playerServices.getPlayer(
        playerId,
        "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
      );
      dispatch({
        type: "SET_PLAYER",
        data: genPlayer(playerResponse)
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        data: error.message
      });
    }
  };
};

const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return action.data;
    case "LOADING":
      return null;
    case "ERROR":
      return { ...state, errorMessage: action.data };
    default:
      return state;
  }
};

export default playerReducer;
