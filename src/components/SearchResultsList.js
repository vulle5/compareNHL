import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import { searchPlayers } from "../functions/searchPlayer";
import { parseSearchResult } from "../functions/parseSearchResult";

const SearchResultsList = ({ term }) => {
  // true means render the player list
  const [listStatus, setListStatus] = useState(true);
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Returns array of player statistics
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);

  useEffect(() => {
    setListStatus(true);
  }, []);

  const renderPlayerList = parsedPlayerIds.map(player => (
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

  return listStatus === true ? <List>{renderPlayerList}</List> : null;
};

export default SearchResultsList;
