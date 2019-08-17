import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import playerReducer from "./reducers/playerReducer";
import playerImageReducer from "./reducers/playerImageReducer";
import filterReducer from "./reducers/filterReducer";
import gameLogsReducer from "./reducers/gameLogsReducer";
import compareReducer from "./reducers/compareReducer";

const reducer = combineReducers({
  player: playerReducer,
  gameLogs: gameLogsReducer,
  playerImage: playerImageReducer,
  filter: filterReducer,
  compare: compareReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
