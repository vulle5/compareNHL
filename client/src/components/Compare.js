import React from "react";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";

import { compareStyles } from "../styles/jss-styles";
import { genPlayer } from "../functions/genPlayer";
import { useGetPlayerInfo } from "../functions/useGetPlayerInfo";

const Compare = ({ match: { params }, classes }) => {
  const playerInfo = useGetPlayerInfo(
    params.playerId,
    "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
  );

  if (_.get(playerInfo, "people[0]")) {
    const player = genPlayer(playerInfo.people[0]);
    console.log(player);
    return <Typography variant="h3">{player.currentTeam.name}</Typography>;
  } else {
    return <CircularProgress />;
  }
};

export default withStyles(compareStyles)(Compare);
