import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import SearchPlayersBar from "./SearchPlayersBar";
import PlayerInfo from "./PlayerInfo";
import Compare from "./Compare";

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
