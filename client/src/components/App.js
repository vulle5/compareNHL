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
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
    } else {
      setTheme("light");
    }
  }, [setTheme]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div style={{ overflowX: "hidden" }} data-testid="foundation">
          <SearchPlayersBar />
          <SideDrawer />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div style={{ minHeight: " calc(100vh - 64px)" }} />
              )}
            />
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
