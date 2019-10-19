import React, { useEffect, Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import SearchPlayersBar from './appBar/SearchPlayersBar';
import ProgressBarGlobal from './ProgressBarGlobal';
import LinearProgressBar from './LinearProgressBar';
import { setTheme } from '../reducers/themeReducer';
import SideDrawer from './SideDrawer';
import history from '../history';
import ErrorMessage from './ErrorMessage';

const Home = lazy(() => import('./homeView/Home'));
const PlayerInfo = lazy(() => import('./playerView/PlayerInfo'));
const Compare = lazy(() => import('./compareView/Compare'));
const TeamInfo = lazy(() => import('./teamView/TeamInfo'));
const GameDetails = lazy(() => import('./gameDetailsView/GameDetails'));

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <SearchPlayersBar />
        <ProgressBarGlobal />
        <SideDrawer />
        <Suspense fallback={<LinearProgressBar />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/team/:id" component={TeamInfo} />
            <Route path="/player/:playerId" component={PlayerInfo} />
            <Route path="/compare/:playerId" component={Compare} />
            <Route path="/gameDetails/:gamePk" component={GameDetails} />
            <Route component={ErrorMessage} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
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
