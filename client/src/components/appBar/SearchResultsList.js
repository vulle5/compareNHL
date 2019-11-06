/*
  There is currently a problem inside React-Router which causes 
  url to be pushed to history even if it is same url as before
  (ie. click same player from search multiple times) there is currently
  workaround for it put it will be fixed for react-router v5.2
  More Info: https://github.com/ReactTraining/react-router/issues/6885
  and https://github.com/ReactTraining/react-router/issues/5362
*/
import React from 'react';
import { Link } from 'react-router-dom';
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
  Button,
  ClickAwayListener
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import history from '../../history';

import { searchResultsListStyles } from '../../styles/jss-styles';

const SearchResultsList = ({
  classes,
  listStatus,
  handleListStatus,
  isInputFocused,
  nonDebouncedTerm,
  searchResults,
  noPlayers,
  isLoading
}) => {
  const onCompareClick = (event, id) => {
    event.preventDefault();
    history.push({ pathname: `/compare/${id}` });
  };

  const firstEight = searchResults.slice(0, 8);
  const renderPlayerList = firstEight.map((player, i) => (
    <Link
      key={player[0]}
      to={`/player/${player[0]}`}
      replace={
        /* TODO remove this prop when react-router v5.2 and/or issue #5362 is fixed */
        history.location.pathname.replace(/\/player\//, '') === player[0]
          ? true
          : false
      }
      onClick={() => {
        handleListStatus(false);
      }}
    >
      <ListItem button alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Player logo"
            src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
              player[0]
            }.jpg`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg';
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${player[2]} ${player[1]}`}
          secondary={player[10]}
        />
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="secondary"
            onClick={event => onCompareClick(event, player[0])}
          >
            compare
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      {i !== firstEight.length - 1 && <Divider />}
    </Link>
  ));

  let content;
  if (isLoading) content = false;
  else content = true;

  return (
    <ClickAwayListener
      onClickAway={() => !isInputFocused && handleListStatus(false)}
    >
      <div
        className={classes.wrapper}
        style={{
          display: !listStatus || nonDebouncedTerm.length < 3 ? 'none' : 'block'
        }}
      >
        <Paper elevation={2} className={classes.paper}>
          <List
            subheader={
              <ListSubheader style={{ padding: '0px' }}>
                <div style={{ position: 'relative' }}>
                  <LinearProgress
                    color="secondary"
                    style={{
                      display: !content ? 'block' : 'none',
                      position: 'absolute',
                      width: '100%'
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
    </ClickAwayListener>
  );
};

export default withStyles(searchResultsListStyles)(SearchResultsList);
