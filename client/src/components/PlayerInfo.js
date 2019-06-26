import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { playerInfoStyles } from "../styles/jss-styles";

import { initializePlayer } from "../reducers/playerReducer";
import getCountryISO2 from "../functions/iso3toIso2";
// import SeasonTable from "./SeasonTable";
// import SeasonTabs from "./SeasonTabs";
// import FloatingActionButton from "./FAB";

import { useGetPlayerImages } from "../functions/useGetPlayerImages";

const PlayerInfo = props => {
  // Get Player id from the React Router props and styles
  const {
    classes,
    match: {
      params: { playerId }
    },
    width,
    initializePlayer,
    player
  } = props;

  // Fetch player images
  const playerImageResponse = useGetPlayerImages(playerId);

  useEffect(() => {
    initializePlayer(playerId);
  }, [initializePlayer, playerId]);

  if (isEmpty(player)) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.root} elevation={1}>
          <img
            className={classes.playerThumbnail}
            src={`data:image/jpg;base64, ${playerImageResponse}`}
            alt="Player"
          />
          <div className={classes.flagWrapper}>
            <img
              src={`https://www.countryflags.io/${getCountryISO2(
                player.nationality
              )}/shiny/48.png`}
              alt="flag"
            />
            <Typography
              variant="h5"
              component="h3"
              className={classes.playerName}
            >
              {`${player.fullName} #${player.primaryNumber}`}
            </Typography>
          </div>
          <Typography component="p">{player.currentTeam.name}</Typography>
          <ul className={classes.mainStats}>
            <li className={classes.mainStatsLi}>
              <Typography component="p">{`Pos: ${
                player.primaryPosition.abbreviation
              }`}</Typography>
            </li>
            <li className={classes.mainStatsLi}>
              <Typography component="p">{`${player.height}, ${
                player.metricHight
              } cm`}</Typography>
            </li>
            <li className={classes.mainStatsLi}>
              <Typography component="p">{`${player.weight} lbs, ${
                player.metricWeight
              } kg`}</Typography>
            </li>
            <li className={classes.mainStatsLi}>
              <Typography component="p">{`Age: ${
                player.currentAge
              }`}</Typography>
            </li>
          </ul>
        </Paper>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    initializePlayer: value => {
      dispatch(initializePlayer(value));
    }
  };
};
const mapStateToProps = state => {
  return {
    player: state.player
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(withStyles(playerInfoStyles)(PlayerInfo)));
