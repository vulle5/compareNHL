import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import SearchPlayersBar from "./appBar/SearchPlayersBar";
import PlayerInfo from "./playerView/PlayerInfo";
import Compare from "./compareView/Compare";

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <SearchPlayersBar />
          <Switch>
            <Route path="/player/:playerId" component={PlayerInfo} />
            <Route path="/compare/:playerId" component={Compare} />
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
