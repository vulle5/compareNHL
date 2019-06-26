import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
import { isEmpty } from "lodash";

import { playerInfoHeader } from "../styles/jss-styles";
import getCountryISO2 from "../functions/iso3toIso2";

const PlayerInfoHeader = ({ classes, player, image }) => {
  console.log([player, image]);

  if (isEmpty(player) || isEmpty(image)) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <Paper className={classes.root} elevation={1}>
        <img
          className={classes.playerThumbnail}
          src={`data:image/jpg;base64, ${image}`}
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
            <Typography component="p">{`Age: ${player.currentAge}`}</Typography>
          </li>
        </ul>
      </Paper>
    );
  }
};

const mapStateToProps = state => {
  console.log(state.player);
  return {
    player: state.player,
    image: state.player.image
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(playerInfoHeader)(PlayerInfoHeader));
