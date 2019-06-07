import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compareStyles } from "../styles/jss-styles";
import { Typography, Paper } from "@material-ui/core";

const CompareTile = ({ classes, player }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">{player.currentTeam.name}</Typography>
      <Typography variant="h6">{player.currentTeam.name}</Typography>
      <Typography variant="h6">{player.currentTeam.name}</Typography>
      <Typography variant="h6">{player.currentTeam.name}</Typography>
      <Typography variant="h6">{player.currentTeam.name}</Typography>
      <Typography variant="h6">{player.currentTeam.name}</Typography>
    </Paper>
  );
};

export default withStyles(compareStyles)(CompareTile);
