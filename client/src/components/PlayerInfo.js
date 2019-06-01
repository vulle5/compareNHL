import React from "react";
import typy from "typy";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { playerInfoStyles } from "../styles/jss-styles";

import { useGetPlayerInfo } from "../functions/useGetPlayerInfo";
import { useGetPlayerImages } from "../functions/useGetPlayerImages";
import { genPlayer } from "../functions/genPlayer";
import SeasonTable from "./SeasonTable";
import SeasonTabs from "./SeasonTabs";
import FloatingActionButton from "./FloatingActionButton";

const PlayerInfo = props => {
  // Get Player id from the React Router props and styles
  const {
    classes,
    match: {
      params: { playerId }
    },
    width
  } = props;
  // Fetch Player Info from the server
  const playerResponse = useGetPlayerInfo(
    playerId,
    "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
  );
  // Fetch player images
  const playerImageResponse = useGetPlayerImages(playerId);
  // In JavaScript Nested Objects are wierd. This line avoids errors with player response being ''
  const playerStats = typy(playerResponse, "people[0]").safeObject;

  const renderInfo = player => {
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.root} elevation={1}>
          <img
            className={classes.playerThumbnail}
            src={`data:image/jpg;base64, ${playerImageResponse}`}
            alt="Player"
          />
          <Typography variant="h5" component="h3">
            {`${player.fullName} #${player.primaryNumber}`}
          </Typography>
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
              }`}</Typography>
            </li>
            <li className={classes.mainStatsLi}>
              <Typography component="p">{`${player.weight}, ${
                player.metricWeight
              }`}</Typography>
            </li>
            <li className={classes.mainStatsLi}>
              <Typography component="p">{`Age: ${
                player.currentAge
              }`}</Typography>
            </li>
          </ul>
          <SeasonTable player={player} />
        </Paper>
        {isWidthUp("sm", width) ? null : <SeasonTabs player={player} />}
        <FloatingActionButton
          to={`/compare/${playerId}`}
          title="Compare"
          isLink
        />
      </div>
    );
  };

  let content;
  const idFromNetwork = typy(playerStats, "id").safeObject;
  if (idFromNetwork !== parseInt(playerId)) {
    content = (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  } else {
    const newPlayer = genPlayer(playerStats);
    content = renderInfo(newPlayer);
  }

  return <div>{content}</div>;
};

export default withWidth()(withStyles(playerInfoStyles)(PlayerInfo));
