import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// CssBaseline removes browser spesific default styles
// so your app starts with blank styling
import CssBaseline from "@material-ui/core/CssBaseline";

import SearchPlayersBar from "./SearchPlayersBar";
import PlayerInfo from "./PlayerInfo";

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <SearchPlayersBar />
          <Switch>
            <Route path="/player/:playerId" component={PlayerInfo} />
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
