import React from 'react';
import typy from 'typy';

import { getPlayerInfo } from '../functions/getPlayerInfo';
import Player from '../models/Player';

const SeasonTable = props => {
  const { id } = props;
  const playerResponse = getPlayerInfo(id, '?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team');
  const playerSeasonsInfo = typy(playerResponse, 'people[0]').safeObject;
  
  if (typy(playerSeasonsInfo, 'id').safeObject) {
    const newPlayer = new Player(
      playerSeasonsInfo.id,
      playerSeasonsInfo.fullName,
      playerSeasonsInfo.link,
      playerSeasonsInfo.firstName,
      playerSeasonsInfo.lastName,
      playerSeasonsInfo.primaryNumber,
      playerSeasonsInfo.birthDate,
      playerSeasonsInfo.currentAge,
      playerSeasonsInfo.birthCity,
      playerSeasonsInfo.birthCountry,
      playerSeasonsInfo.nationality,
      playerSeasonsInfo.height,
      playerSeasonsInfo.weight,
      playerSeasonsInfo.active,
      playerSeasonsInfo.alternateCaptain,
      playerSeasonsInfo.captain,
      playerSeasonsInfo.rookie,
      playerSeasonsInfo.shootsCatches,
      playerSeasonsInfo.rosterStatus,
      playerSeasonsInfo.currentTeam,
      playerSeasonsInfo.primaryPosition,
      playerSeasonsInfo.stats
    );
    console.log(newPlayer);
  }

  return (
    <div>
      <h1>SeasonTable</h1>
    </div>
  );
}

export default SeasonTable;
