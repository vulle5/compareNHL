import playerServices from "../services/player";
import { genPlayer } from "../functions/genPlayer";
import history from "../history";
import qs from "qs";

function makeIdsFromQuery(firstId, query) {
  if (!query) {
    return [firstId];
  }
  if (typeof query === "string") {
    return [firstId, query];
  }
  const noEmptyStrings = query.filter(id => id !== "");
  return [firstId, ...noEmptyStrings];
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
      const ids = makeIdsFromQuery(playerId, add);
      if (ids.length) {
        const result = await playerServices.getMultiplePlayers(
          ids,
          "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
        );
        const playerObjects = result.map(player => genPlayer(player.people[0]));
        dispatch({
          type: "SET_COMPARE",
          data: playerObjects
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
      if (history.location.search.includes("?add=")) {
        const search =
          history.location.search === "?add="
            ? `${history.location.search}${playerId}`
            : `${history.location.search},${playerId}`;
        history.push({
          pathname: history.location.pathname,
          search
        });
      } else {
        history.push({
          pathname: history.location.pathname,
          search: `?add=${history.location.search}${playerId}`
        });
      }

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
  if (history.location.pathname.includes(playerId)) {
    const newId = history.location.search.match(/=(,|)(\d{7})/);
    history.push({
      pathname: `/compare/${newId[2]}`,
      search: history.location.search.replace(
        new RegExp(`(,|)${newId[2]}(,|)`),
        ""
      )
    });
  } else {
    history.push({
      pathname: history.location.pathname,
      search: history.location.search.replace(
        new RegExp(`(,|)${playerId}(,|)`),
        ""
      )
    });
  }
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
