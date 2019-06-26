import React, { useEffect } from "react";
import { connect } from "react-redux";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { playerInfoStyles } from "../styles/jss-styles";

import { initializePlayer } from "../reducers/playerReducer";
import { initializePlayerImage } from "../reducers/playerImageReducer";
import PlayerInfoHeader from "./PlayerInfoHeader";
// import SeasonTable from "./SeasonTable";
// import SeasonTabs from "./SeasonTabs";
// import FloatingActionButton from "./FAB";

const PlayerInfo = props => {
  // Get Player id from the React Router props and styles
  const {
    classes,
    match: {
      params: { playerId }
    },
    width,
    initializePlayer,
    initializePlayerImage
  } = props;

  useEffect(() => {
    initializePlayer(playerId);
    initializePlayerImage(playerId);
  }, [initializePlayer, initializePlayerImage, playerId]);

  return (
    <div className={classes.wrapper}>
      <PlayerInfoHeader />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    initializePlayer: value => {
      dispatch(initializePlayer(value));
    },
    initializePlayerImage: value => {
      dispatch(initializePlayerImage(value));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withWidth()(withStyles(playerInfoStyles)(PlayerInfo)));
