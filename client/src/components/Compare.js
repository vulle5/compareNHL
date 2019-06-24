import React from "react";
import { get } from "lodash";
import { CircularProgress } from "@material-ui/core";

import { genPlayer } from "../functions/genPlayer";
import { useGetPlayerInfo } from "../functions/useGetPlayerInfo";
import CompareTile from "./CompareTile";

const Compare = ({ match: { params } }) => {
  const playerInfo = useGetPlayerInfo(
    params.playerId,
    "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
  );

  if (get(playerInfo, "people[0]")) {
    const player = genPlayer(playerInfo.people[0]);
    return (
      <>
        <CompareTile player={player} />
        <CompareTile player={player} />
        <CompareTile player={player} />
        <CompareTile player={player} />
      </>
    );
  } else {
    return <CircularProgress />;
  }
};

export default Compare;
