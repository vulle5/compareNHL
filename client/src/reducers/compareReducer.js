import playerServices from "../services/player";
import {genPlayer} from "../functions/genPlayer";
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

function mapOrder(array, order, key) {
  array.sort(function(a, b) {
    var A = a[key].toString(),
      B = b[key].toString();

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return array;
}

async function fetchPlayer(playerId) {
  const {
    people: { 0: playerResponse }
  } = await playerServices.getPlayer(
    playerId,
    "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
  );
  return playerResponse;
}

async function fetchMultiplePlayers(ids) {
  return await playerServices.getMultiplePlayers(
      ids,
      "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
  );
}

function findFromCache(playerId) {
  // Get players from session storage
  const storage = sessionStorage.getItem("compare");
  const playersInSession = JSON.parse(storage);
  // Find if player is in storage
  const isPlayerInSession = playersInSession.find(
    player => player.id.toString() === playerId
  );
  if (isPlayerInSession) {
    return isPlayerInSession;
  }
  return undefined;
}

function addPlayerHistory(playerId) {
  if (
      !history.location.search.includes(playerId) &&
      !history.location.pathname.includes(playerId)
  ) {
    if (history.location.search.includes("?add=")) {
      const search =
          history.location.search === "?add="
              ? `${history.location.search}${playerId}`
              : `${history.location.search},${playerId}`;
      history.replace({
        pathname: history.location.pathname,
        search
      });
    } else {
      history.replace({
        pathname: history.location.pathname,
        search: `?add=${history.location.search}${playerId}`
      });
    }
  }
}

function removePlayerHistory(playerId) {
  if (history.location.pathname.includes(playerId)) {
    const newId = history.location.search.match(/=(,|)(\d{7})/);
    history.replace({
      pathname: `/compare/${newId[2]}`,
      search: history.location.search
          .replace(new RegExp(`(,|)${playerId}(,|)`, "g"), "")
          .replace(new RegExp(`(,|)${newId[2]}(,|)`, "g"), "")
    });
  } else {
    history.replace({
      pathname: history.location.pathname,
      search: history.location.search.match(`,${playerId},`)
          ? history.location.search.replace(
              new RegExp(`(,|)${playerId}(,|)`),
              ","
          )
          : history.location.search.replace(new RegExp(`(,|)${playerId}(,|)`), "")
    });
  }
}

async function checkCacheAndStore(getStore, queryIds) {
  const storage = sessionStorage.getItem("compare");
  const { compare: store } = getStore();
  // Store has no length and Session is empty
  if (!store.length && !storage) {
    // Get all players from url
    const result = await fetchMultiplePlayers(queryIds);
    const playerObjects = result.map(player => genPlayer(player.people[0]));
    // Add those players to sessionStorage
    sessionStorage.setItem("compare", JSON.stringify(playerObjects));
    // Return them to add them all to redux store
    return playerObjects;
  }
  // Store has no length but session is not empty
  if (!store.length && storage) {
    // Get all players from sessionStorage
    const playersInSession = JSON.parse(storage);
    // Check if url ids match players in sessionStorage
    const sessionIds = playersInSession.map(player => player.id.toString());
    const fetchIds = queryIds.filter(id => !sessionIds.includes(id));
    // Fetch players that are NOT in sessionStorage
    const result = await fetchMultiplePlayers(fetchIds);
    const playerObjects = result.map(player => genPlayer(player.people[0]));
    // Add players to session from fetch
    const playersToStorage = playersInSession.concat(playerObjects);
    sessionStorage.setItem("compare", JSON.stringify(playersToStorage));
    // Remove players that are not in url and return to add them to redux store
    const finalPlayers = playersToStorage.filter(player =>
      queryIds.includes(player.id.toString())
    );
    // Sort players (mutates finalPlayers) based on url and return it
    mapOrder(finalPlayers, queryIds, "id");
    return finalPlayers;
  }
  /* 
    IF STORE IS EMPTY CODE BELOW CANNOT BE REACHED
  */
  // Store has length but session is empty
  if (store.length && !storage) {
    const result = await fetchMultiplePlayers(queryIds);
    const finalPlayers = result.map(player => genPlayer(player.people[0]));
    sessionStorage.setItem("compare", JSON.stringify(finalPlayers));
    return finalPlayers;
  }
  // Stores has length and session is not empty
  if (store.length && storage) {
    const playersInSession = JSON.parse(storage);
    // players ids in session
    const sessionIds = playersInSession.map(player => player.id.toString());
    // players ids in store
    const storeIds = store.map(player => player.id.toString());
    // Find which players are in redux store but not in sessionStorage
    const idsToAdd = storeIds.filter(id => !sessionIds.includes(id));
    const addToSession = store.filter(player =>
      idsToAdd.includes(player.id.toString())
    );
    // Add missing players to sessionStorage
    const playersToStorage = playersInSession.concat(addToSession);
    sessionStorage.setItem("compare", JSON.stringify(playersToStorage));
    // Let check if there are still players missing
    const finalPlayers = playersToStorage.filter(player =>
      queryIds.includes(player.id.toString())
    );
    // Fetch missing players
    if (!finalPlayers.length) {
      const result = await fetchMultiplePlayers(queryIds);
      const missingPlayers = result.map(player => genPlayer(player.people[0]));
      sessionStorage.setItem(
        "compare",
        JSON.stringify(playersToStorage.concat(missingPlayers))
      );
      mapOrder(missingPlayers, queryIds, "id");
      return missingPlayers;
    }
    // Sort players (mutates finalPlayers) based on url and return it
    mapOrder(finalPlayers, queryIds, "id");
    return finalPlayers;
  }
}

export const initializeCompare = playerId => {
  return async (dispatch, getStore) => {
    try {
      dispatch({ type: "LOADING" });
      const {
        location: { search }
      } = history;
      const { add } = qs.parse(search.substring(1), {
        comma: true,
        parameterLimit: 1
      });
      const ids = makeIdsFromQuery(playerId, add);
      const playerObjects = await checkCacheAndStore(getStore, ids);
      if (playerObjects) {
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
      let playerToAdd = findFromCache(playerId);
      if (!playerToAdd) {
        playerToAdd = await fetchPlayer(playerId);
      }
      addPlayerHistory(playerId);
      dispatch({
        type: "ADD_COMPARE",
        data: genPlayer(playerToAdd)
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
  removePlayerHistory(playerId);
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
