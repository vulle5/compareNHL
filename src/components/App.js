import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SearchPlayersBar from "./SearchPlayersBar";
import PlayerInfo from "./PlayerInfo";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <SearchPlayersBar />
          <Switch>
            <Route path="/player/:id" component={PlayerInfo} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
