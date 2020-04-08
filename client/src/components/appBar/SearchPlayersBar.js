import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { AppBar, Toolbar, IconButton, Typography, ButtonGroup, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { searchPlayerBarStyles } from '../../styles/jss-styles';
import playerService from '../../services/player';
import { toggleDrawer } from '../../reducers/drawerReducer';
import history from '../../history';

import SearchResultsList from './SearchResultsList';
import SearchPlayersInput from './SearchPlayersInput';

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
    <div className={classes.root}>
      <AppBar position="fixed" color={theme === 'dark' ? 'default' : 'primary'}>
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
          <ButtonGroup style={{ margin: '0px 32px' }}>
            <Button onClick={() => history.replace('/')}>Schedule</Button>
            <Button onClick={() => history.replace('/standings')}>Standings</Button>
          </ButtonGroup>
          <div className={classes.grow} />
          <SearchPlayersInput
            setListStatus={setListStatus}
            term={term}
            setTerm={setTerm}
            setInputIsFocused={setInputIsFocused}
          />
        </Toolbar>
        <SearchResultsList
          nonDebouncedTerm={term}
          listStatus={listStatus}
          setListStatus={setListStatus}
          isInputFocused={inputIsFocused}
          searchResults={searchResults}
          noPlayers={noPlayers}
          isLoading={isLoading}
        />
      </AppBar>
    </div>
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
