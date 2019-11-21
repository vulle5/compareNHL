import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { searchPlayerBarStyles } from '../../styles/jss-styles';
import playerService from '../../services/player';
import SearchResultsList from './SearchResultsList';
import { toggleDrawer } from '../../reducers/drawerReducer';
import history from '../../history';

// TODO: refactor this to smaller components
const SearchPlayersBar = props => {
  const { classes, theme, toggleDrawer } = props;
  const [term, setTerm] = useState('');
  const [listStatus, setListStatus] = useState(true);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  // This delays sending of the search term to API request
  const [debouncedText] = useDebounce(term, 300);
  // List states
  const [searchResults, setSearchResults] = useState([]);
  const [noPlayers, setNoPlayers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const handleListStatus = bool => setListStatus(bool);

  useEffect(() => {
    (async () => {
      if (debouncedText !== '') {
        setIsLoading(true);
        const arrayOfPlayers = await playerService.getSearch(debouncedText);
        if (typeof arrayOfPlayers === 'string') {
          setNoPlayers(true);
          setIsLoading(false);
        } else {
          setNoPlayers(false);
          setIsLoading(false);
          setSearchResults(arrayOfPlayers);
        }
      }
    })();
  }, [debouncedText]);

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color={theme === 'dark' ? 'default' : 'primary'}
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={event => toggleDrawer(event)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              style={inputIsFocused && matches ? { display: 'none' } : null}
              variant="h6"
              color="inherit"
              onClick={() => {
                if (history.location.pathname !== '/') {
                  history.push('/');
                }
              }}
              noWrap
            >
              CompareNHL
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                autoComplete="off"
                id="player-search"
                placeholder="Search Players"
                value={term}
                inputProps={{
                  'aria-label': 'Search players'
                }}
                onFocus={e => {
                  e.target.select();
                  handleListStatus(true);
                  setInputIsFocused(true);
                }}
                onBlur={() => setInputIsFocused(false)}
                onChange={event => setTerm(event.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
          <SearchResultsList
            nonDebouncedTerm={term}
            listStatus={listStatus}
            handleListStatus={handleListStatus}
            isInputFocused={inputIsFocused}
            searchResults={searchResults}
            noPlayers={noPlayers}
            isLoading={isLoading}
          />
        </AppBar>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.theme.palette.type
  };
};

export default connect(mapStateToProps, { toggleDrawer })(
  withStyles(searchPlayerBarStyles)(SearchPlayersBar)
);
