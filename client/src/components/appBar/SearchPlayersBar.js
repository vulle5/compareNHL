import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
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

import { searchPlayerBarStyles } from "../../styles/jss-styles";
import SearchResultsList from "./SearchResultsList";
import { toggleDrawer } from "../../reducers/drawerReducer";

const SearchPlayersBar = props => {
  const { classes, theme, toggleDrawer } = props;
  const [term, setTerm] = useState("");
  const [listStatus, setListStatus] = useState(true);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  // This delays sending of the search term to API request
  const [debouncedText] = useDebounce(term, 300);

  const handleListStatus = bool => setListStatus(bool);

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color={theme === "dark" ? "default" : "primary"}
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
              <InputBase
                autoFocus
                autoComplete="off"
                id="player-search"
                placeholder="Search Players"
                value={term}
                inputProps={{
                  "aria-label": "Search players"
                }}
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
            </div>
          </Toolbar>
          <SearchResultsList
            term={debouncedText}
            listStatus={listStatus}
            handleListStatus={handleListStatus}
            isInputFocused={inputIsFocused}
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

export default connect(
  mapStateToProps,
  { toggleDrawer }
)(withStyles(searchPlayerBarStyles)(SearchPlayersBar));
