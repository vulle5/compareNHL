/*
  There is currently a problem inside React-Router which causes 
  url to be pushed to history even if it is same url as before
  (ie. click same player from search multiple times) there is currently
  workaround for it put it will be fixed for react-router v5.2
  More Info: https://github.com/ReactTraining/react-router/issues/6885
  and https://github.com/ReactTraining/react-router/issues/5362
*/
import React from 'react';
import {
  List,
  Typography,
  Paper,
  ListSubheader,
  LinearProgress,
  ClickAwayListener
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { searchResultsListStyles } from '../../styles/jss-styles';
import SearchResultListItem from './SearchResultListItem';

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
  const firstEightPlayers = searchResults.slice(0, 8);

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
              firstEightPlayers.map((player, i) => (
                <SearchResultListItem
                  key={player[0]}
                  player={player}
                  handleListStatus={handleListStatus}
                  noDivider={i === firstEightPlayers.length - 1}
                />
              ))
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
