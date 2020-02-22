import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import playerReducer from './reducers/playerReducer';
import playerImageReducer from './reducers/playerImageReducer';
import filterReducer from './reducers/filterReducer';
import gameLogsReducer from './reducers/gameLogsReducer';
import compareReducer from './reducers/compareReducer';
import themeReducer from './reducers/themeReducer';
import drawerReducer from './reducers/drawerReducer';
import globalProgressReducer from './reducers/globalProgressReducer';
import teamReducer from './reducers/teamReducer';
import gameDetailReducer from './reducers/gameDetailReducer';
import dialogReducer from './reducers/dialogReducer';
import gameHighlightReducer from './reducers/gameHighlightReducer';
import scheduleReducer from './reducers/scheduleReducer';

const reducer = combineReducers({
  player: playerReducer,
  gameLogs: gameLogsReducer,
  playerImage: playerImageReducer,
  filter: filterReducer,
  compare: compareReducer,
  theme: themeReducer,
  drawer: drawerReducer,
  globalProgress: globalProgressReducer,
  teams: teamReducer,
  gameDetail: gameDetailReducer,
  dialogDetail: dialogReducer,
  gameHighlights: gameHighlightReducer,
  schedule: scheduleReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
