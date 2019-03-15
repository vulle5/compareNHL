import React, { useState, Fragment } from "react";
import { useDebounce } from "use-debounce";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import { styles } from "../styles/SearchPlayersBarStyles";
import SearchResultsList from "./SearchResultsList";

const SearchPlayersBar = props => {
  const { classes } = props;
  const [term, setTerm] = useState("");
  // This delays sending of the search term to API request
  const debouncedText = useDebounce(term, 300);

  let content;
  if (term.length < 3) {
    content = null;
  } else {
    content = <SearchResultsList term={debouncedText} />;
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
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Material-UI
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                autoFocus
                placeholder="Search Players"
                value={term}
                onFocus={event => event.target.select()}
                onChange={event => setTerm(event.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {content}
    </Fragment>
  );
};

export default withStyles(styles)(SearchPlayersBar);
