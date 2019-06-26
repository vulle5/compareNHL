import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import playerReducer from "./reducers/playerReducer";
import playerImageReducer from "./reducers/playerImageReducer";

const reducer = combineReducers({
  player: playerReducer,
  playerImage: playerImageReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
