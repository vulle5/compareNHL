import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, CircularProgress } from "@material-ui/core";
import { isEmpty } from "lodash";

import { compareStyles } from "../../styles/jss-styles";
import { initializePlayer } from "../../reducers/playerReducer";

const CompareTile = () => {
  return (
    <Paper>
      <h1>CompareTile</h1>
    </Paper>
  );
};

const Compare = ({
  match: {
    params: { playerId }
  },
  classes,
  player,
  initializePlayer
}) => {
  useEffect(() => {
    initializePlayer(playerId);
  }, [initializePlayer, playerId]);

  if (isEmpty(player)) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h2">{player.currentTeam.name}</Typography>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    player: state.player
  };
};

export default connect(
  mapStateToProps,
  { initializePlayer }
)(withStyles(compareStyles)(Compare));
