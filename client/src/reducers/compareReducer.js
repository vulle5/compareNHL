import playerServices from "../services/player";
import { genPlayer } from "../functions/genPlayer";
import history from "../history";
import qs from "qs";

function makeIdsFromQuery(firstId, query) {
  if (typeof query === "string") {
    return [firstId, query];
  }
  return [firstId, ...query];
}

export const initializeCompare = playerId => {
  return async dispatch => {
    try {
      const {
        location: { search }
      } = history;
      const { add } = qs.parse(search.substring(1), {
        comma: true,
        parameterLimit: 1
      });
      if (add) {
        const ids = makeIdsFromQuery(playerId, add);
        const result = await playerServices.getMultiplePlayers(
          ids,
          "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
        );
        const playerObjects = result.map(player => genPlayer(player.people[0]));
        dispatch({
          type: "SET_COMPARE",
          data: playerObjects
        });
      } else {
        const {
          people: { 0: playerResponse }
        } = await playerServices.getPlayer(
          playerId,
          "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
        );
        dispatch({
          type: "SET_COMPARE",
          data: [genPlayer(playerResponse)]
        });
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        data: error.message
      });
    }
  };
};

export const addCompare = playerId => {
  return async dispatch => {
    try {
      const {
        people: { 0: playerResponse }
      } = await playerServices.getPlayer(
        playerId,
        "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
      );
      history.push({
        pathname: history.location.pathname,
        search: `${history.location.search},${playerId}`
      });
      dispatch({
        type: "ADD_COMPARE",
        data: genPlayer(playerResponse)
      });
    } catch (error) {
      // TODO: Handle adding errors
      dispatch({
        type: "NO_TYPE",
        data: ""
      });
    }
  };
};

export const removeCompare = playerId => {
  return {
    type: "DELETE_COMPARE",
    data: playerId
  };
};

const compareReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COMPARE":
      return [...action.data];
    case "ADD_COMPARE":
      return state.some(player => player.id === action.data.id)
        ? state
        : [...state, { ...action.data }];
    case "DELETE_COMPARE":
      return state.filter(player => player.id !== action.data);
    case "ERROR":
      return { ...state, errorMessage: action.data };
    default:
      return state;
  }
};

export default compareReducer;
