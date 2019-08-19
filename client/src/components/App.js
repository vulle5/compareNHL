import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import SearchPlayersBar from "./appBar/SearchPlayersBar";
import PlayerInfo from "./playerView/PlayerInfo";
import Compare from "./compareView/Compare";
import { setTheme } from "../reducers/themeReducer";
import SideDrawer from "./SideDrawer";

const App = ({ setTheme, theme }) => {
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <SearchPlayersBar />
          <SideDrawer />
          <Switch>
            <Route path="/player/:playerId" component={PlayerInfo} />
            <Route path="/compare/:playerId" component={Compare} />
          </Switch>
        </div>
      </BrowserRouter>
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
