import React, { useEffect } from "react";
import { connect } from "react-redux";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { playerInfoStyles } from "../styles/jss-styles";

import { initializePlayer, getPlayerImage } from "../reducers/playerReducer";
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
    getPlayerImage,
    player,
    image
  } = props;

  useEffect(() => {
    initializePlayer(playerId);
    getPlayerImage(playerId);
  }, [initializePlayer, getPlayerImage, playerId]);

  console.log("Trying to render header");
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
    getPlayerImage: value => {
      dispatch(getPlayerImage(value));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withWidth()(withStyles(playerInfoStyles)(PlayerInfo)));
