import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import playerReducer from "./reducers/playerReducer";

const reducer = combineReducers({
  player: playerReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
