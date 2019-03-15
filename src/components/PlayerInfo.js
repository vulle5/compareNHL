import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import typy from 'typy';

import { getPlayerInfo } from '../functions/getPlayerInfo';

const PlayerInfo = ( props ) => {
  // Get Player id from the React Router props
  const { playerId } = props.match.params;
  // Fetch Player Info from the server
  const playerResponse = getPlayerInfo(playerId);
  console.log(playerResponse);
  // In JavaScript Nested Objects are wierd. This line avoids errors with player response being ''
  const playerStats = typy(playerResponse, 'people[0]').safeObject;

  let content;
  if (!playerStats) {   
    content = <CircularProgress />;    
  } else {
    content = playerStats.fullName;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default PlayerInfo;
