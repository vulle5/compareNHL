import React from "react";
import typy from "typy";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compareStyles } from "../styles/jss-styles"
import { genPlayer } from "../functions/genPlayer"
import { getPlayerInfo } from "../functions/getPlayerInfo";

const Compare = ({ match: { params }, classes }) => {
  const playerInfo = getPlayerInfo(
    params.playerId, "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
  );

  const renderContent = player => {
    return (
      <Paper className={classes.paper}>
        <div style={{ margin: "16px" }}>
          <Typography variant="h5">{player.fullName}</Typography>
          <Typography variant="subtitle1" component="ul">
            <li>Games Played:</li>
            <li>Points:</li>
            <li>Goals:</li>
            <li>Assists:</li>
          </Typography>
        </div>
        <div style={{ margin: "16px" }}>
          <Typography variant="h5">Nolan Patrick</Typography>
          <Typography variant="subtitle1" component="ul">
            <li>Games Played</li>
            <li>82</li>
            <li>Points</li>
            <li>50</li>
            <li>Goals</li>
            <li>25</li>
            <li>Assists</li>
            <li>25</li>
          </Typography>
        </div>
      </Paper>
    );
  }

  let content;
  if (typy(playerInfo, "people[0]").safeObject) {
    const player = genPlayer(typy(playerInfo, "people[0]").safeObject);
    content = renderContent(player)
  } else {
    content = <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      {content}
    </div>
  );
};

export default withStyles(compareStyles)(Compare);
