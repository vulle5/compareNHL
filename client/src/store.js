import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import playerReducer from "./reducers/playerReducer";
import playerImageReducer from "./reducers/playerImageReducer";
import filterReducer from "./reducers/filterReducer";
import gameLogsReducer from "./reducers/gameLogsReducer";

const reducer = combineReducers({
  player: playerReducer,
  gameLogs: gameLogsReducer,
  playerImage: playerImageReducer,
  filter: filterReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
