import React from "react";

import { getPlayerInfo } from '../functions/getPlayerInfo';

const PlayerInfo = ( props ) => {
  const { playerId } = props.match.params;
  const playerResponse = getPlayerInfo(playerId);
  console.log(playerResponse);
  const playerStats = playerResponse.people;

  return (
    <div>
      {`${playerStats}`}
    </div>
  );
};

export default PlayerInfo;
