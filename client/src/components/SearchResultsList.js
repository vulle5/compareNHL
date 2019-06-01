import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  Typography,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import OutsideClickHandler from "react-outside-click-handler";

import { useSearchPlayer } from "../functions/useSearchPlayer";
import { parseSearchResult } from "../functions/parseSearchResult";
import { searchResultsListStyles } from "../styles/jss-styles";

const SearchResultsList = ({
  term,
  classes,
  listStatus,
  handleListStatus,
  isInputFocused
}) => {
  // Needs to be parsed for better usability
  const arrayOfPlayers = useSearchPlayer(term);
  // Returns array of player statistics
  const parsedPlayerIds =
    typeof arrayOfPlayers !== "string" ? parseSearchResult(arrayOfPlayers) : [];
  const [noPlayers, setNoPlayers] = useState(false);

  useEffect(() => {
    typeof arrayOfPlayers !== "string"
      ? setNoPlayers(false)
      : setNoPlayers(true);
  }, [arrayOfPlayers]);

  const renderPlayerList = parsedPlayerIds.slice(0, 8).map(player => (
    <Link
      key={player[0]}
      to={`/player/${player[0]}`}
      onClick={() => {
        handleListStatus(false);
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Player"
            src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
              player[0]
            }.jpg`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                "https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg";
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${player[2]} ${player[1]}`}
          secondary={
            <Typography component="span" color="textSecondary">
              {player[10]}
            </Typography>
          }
        />
      </ListItem>
      <Divider />
    </Link>
  ));

  return listStatus === true ? (
    <OutsideClickHandler
      onOutsideClick={() => (isInputFocused ? null : handleListStatus(false))}
    >
      <div className={classes.wrapper}>
        <Paper elevation={2} className={classes.paper}>
          <List>
            {noPlayers ? (
              <Typography className={classes.message} variant="subtitle1">
                {arrayOfPlayers}
              </Typography>
            ) : parsedPlayerIds.length === 0 ? (
              <CircularProgress className={classes.spinner} />
            ) : (
              renderPlayerList
            )}
          </List>
        </Paper>
      </div>
    </OutsideClickHandler>
  ) : null;
};

export default withStyles(searchResultsListStyles)(SearchResultsList);
