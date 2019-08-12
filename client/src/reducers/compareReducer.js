import playerServices from "../services/player";
import { genPlayer } from "../functions/genPlayer";

export const initializeCompare = playerId => {
  return async dispatch => {
    const {
      people: { 0: playerResponse }
    } = await playerServices.getPlayer(
      playerId,
      "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
    );
    dispatch({
      type: "SET_COMPARE",
      data: genPlayer(playerResponse)
    });
  };
};

export const addCompare = playerId => {
    // TODO: Implement
  return []
};

const compareReducer = (state = [], action) => {
  // TODO: Implement reducer
    switch (action.type) {
    case "SET_COMPARE":
      return [{...action.data}]
    case "ADD_COMPARE":
      return [...state, {...action.data}]
    default:
      return state;
  }
};

export default compareReducer;