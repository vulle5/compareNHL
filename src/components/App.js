import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SearchPlayersBar from "./SearchPlayersBar";
import PlayerInfo from "./PlayerInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route exact path="/" component={SearchPlayersBar} />
          <Route path="/player/:id" component={PlayerInfo} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
