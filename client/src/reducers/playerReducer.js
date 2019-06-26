import playerServices from "../services/player";
import { genPlayer } from "../functions/genPlayer";

export const initializePlayer = playerId => {
  return async dispatch => {
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
  };
};

export const getPlayerImage = playerId => {
  return async dispatch => {
    const response = await playerServices.getImage(playerId, {
      responseType: "arraybuffer"
    });
    const data = new Buffer.from(response, "binary").toString("base64");
    dispatch({
      type: "SET_IMAGE",
      data
    });
  };
};

const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return action.data;
    case "SET_IMAGE":
      return { ...state, ...{ image: action.data } };
    default:
      return state;
  }
};

export default playerReducer;
