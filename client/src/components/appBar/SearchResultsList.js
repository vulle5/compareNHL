import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Paper,
  ListSubheader,
  LinearProgress,
  ListItemSecondaryAction,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import OutsideClickHandler from "react-outside-click-handler";
import history from "../../history";

import playerService from "../../services/player";
import { searchResultsListStyles } from "../../styles/jss-styles";

const SearchResultsList = ({
  term,
  classes,
  listStatus,
  handleListStatus,
  isInputFocused,
  nonDebouncedTerm
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [noPlayers, setNoPlayers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (term !== "") {
        setIsLoading(true);
        const arrayOfPlayers = await playerService.getSearch(term);
        if (typeof arrayOfPlayers === "string") {
          setNoPlayers(true);
          setIsLoading(false);
        } else {
          setNoPlayers(false);
          setIsLoading(false);
          setSearchResults(arrayOfPlayers);
        }
      }
    })();
  }, [term]);

  const onCompareClick = (event, id) => {
    event.preventDefault();
    history.push({ pathname: `/compare/${id}` });
  };

  const renderPlayerList = searchResults.slice(0, 8).map(player => (
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
          secondary={player[10]}
        />
        <ListItemSecondaryAction>
          <Button
            variant="outlined"
            color="secondary"
            onClick={event => onCompareClick(event, player[0])}
          >
            compare
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Link>
  ));

  let content;
  if (isLoading) content = false;
  else content = true;

  return (
    <OutsideClickHandler
      onOutsideClick={() => !isInputFocused && handleListStatus(false)}
    >
      <div
        className={classes.wrapper}
        style={{
          display: !listStatus || nonDebouncedTerm.length < 3 ? "none" : "block"
        }}
      >
        <Paper elevation={2} className={classes.paper}>
          <List
            subheader={
              <ListSubheader style={{ padding: "0px" }}>
                <div style={{ position: "relative" }}>
                  <LinearProgress
                    color="secondary"
                    style={{
                      display: !content ? "block" : "none",
                      position: "absolute",
                      width: "100%"
                    }}
                  />
                </div>
              </ListSubheader>
            }
            className={classes.playerList}
          >
            {!noPlayers ? (
              renderPlayerList
            ) : (
              <Typography className={classes.message} variant="subtitle1">
                No players were found
              </Typography>
            )}
          </List>
        </Paper>
      </div>
    </OutsideClickHandler>
  );
};

export default withStyles(searchResultsListStyles)(SearchResultsList);
