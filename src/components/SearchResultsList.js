import React, { useState } from "react";
import typy from "typy";
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

import { searchPlayers } from "../functions/searchPlayer";
import { parseSearchResult } from "../functions/parseSearchResult";
import { searchResultsListStyles } from "../styles/jss-styles";

const SearchResultsList = ({ term, classes }) => {
  // true means render the player list
  const [listStatus, setListStatus] = useState(true);
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Returns array of player statistics
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);

  const renderPlayerList = parsedPlayerIds.slice(0, 8).map(player => (
    <Link
      key={player[0]}
      to={`/player/${player[0]}`}
      onClick={() => {
        setListStatus(false);
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
    <div className={classes.wrapper}>
      <Paper elevation={2} className={classes.paper}>
        <List>
          {typy(parsedPlayerIds).isEmptyArray ? (
            <CircularProgress className={classes.spinner}/>
          ) : (
            renderPlayerList
          )}
        </List>
      </Paper>
    </div>
  ) : null;
};

export default withStyles(searchResultsListStyles)(SearchResultsList);
