import React, { useState, Fragment } from "react";
import { useDebounce } from "use-debounce";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import { searchPlayerBarStyles } from "../styles/jss-styles";
import SearchResultsList from "./SearchResultsList";

const SearchPlayersBar = props => {
  const { classes } = props;
  const [term, setTerm] = useState("");
  const [listStatus, setListStatus] = useState(true);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  // This delays sending of the search term to API request
  const [debouncedText] = useDebounce(term, 300);

  const handleListStatus = bool => setListStatus(bool);

  let content;
  if (term.length < 3) {
    content = null;
  } else {
    content = (
      <SearchResultsList
        term={debouncedText}
        listStatus={listStatus}
        handleListStatus={handleListStatus}
        isInputFocused={inputIsFocused}
      />
    );
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              disabled
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              CompareNHL
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <label>
                <InputBase
                  autoFocus
                  autoComplete="off"
                  id="player-search"
                  placeholder="Search Players"
                  value={term}
                  onFocus={() => {
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
              </label>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {content}
    </Fragment>
  );
};

export default withStyles(searchPlayerBarStyles)(SearchPlayersBar);
