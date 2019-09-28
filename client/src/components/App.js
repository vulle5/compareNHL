import React, { useEffect, Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Home from './homeView/Home';
import SearchPlayersBar from './appBar/SearchPlayersBar';
import ProgressBarGlobal from './ProgressBarGlobal';
import LinearProgressBar from './LinearProgressBar';
import { setTheme } from '../reducers/themeReducer';
import SideDrawer from './SideDrawer';
import history from '../history';

const PlayerInfo = lazy(() => import('./playerView/PlayerInfo'));
const Compare = lazy(() => import('./compareView/Compare'));
const TeamInfo = lazy(() => import('./teamView/TeamInfo'));

const App = ({ setTheme, theme }) => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme);
    } else {
      setTheme('light');
    }
  }, [setTheme]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <div style={{ width: '100%' }}>
          <SearchPlayersBar />
          <ProgressBarGlobal />
          <SideDrawer />
          <Suspense fallback={<LinearProgressBar />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/team/:id" component={TeamInfo} />
              <Route path="/player/:playerId" component={PlayerInfo} />
              <Route path="/compare/:playerId" component={Compare} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
};

export default connect(
  mapStateToProps,
  { setTheme }
)(App);
