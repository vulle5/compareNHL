import React from 'react';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { searchPlayerBarStyles } from '../../styles/jss-styles';
import { withStyles } from '@material-ui/core/styles';

const SearchPlayersInput = ({
  setInputIsFocused,
  term,
  setTerm,
  setListStatus,
  classes
}) => {
  return (
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
          setListStatus(true);
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
  );
};
export default withStyles(searchPlayerBarStyles)(SearchPlayersInput);
