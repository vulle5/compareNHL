import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import typy from 'typy';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import { playerInfoStyles } from "../styles/jss-styles";

import { getPlayerInfo } from '../functions/getPlayerInfo';

const PlayerInfo = ( props ) => {
  // Get Player id from the React Router props
  const { playerId } = props.match.params;
  const { classes } = props;
  // Fetch Player Info from the server
  const playerResponse = getPlayerInfo(playerId);
  console.log(playerResponse);
  // In JavaScript Nested Objects are wierd. This line avoids errors with player response being ''
  const playerStats = typy(playerResponse, 'people[0]').safeObject;

  const renderInfo = (playerStats, classes) => {
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            {playerStats.fullName}
          </Typography>
          <Typography component="p">
            {playerStats.currentTeam.name}
          </Typography>
        </Paper>
      </div>
    );
  }

  let content;
  if (!playerStats) {   
    content = <CircularProgress />;    
  } else {
    content = renderInfo(playerStats, classes);
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default withStyles(playerInfoStyles)(PlayerInfo);
