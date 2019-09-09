import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListSubheader,
  LinearProgress,
  Input,
  Typography
} from "@material-ui/core";
import { useDebounce } from "use-debounce";
import { useCompareStyles } from "../../styles/useStyles";
import playerService from "../../services/player";
import CompareDialogItem from "./CompareDialogItem";

const CompareDialog = ({ onClose, open, onOutsideClick }) => {
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noPlayers, setNoPlayers] = useState(false);

  const [debouncedText] = useDebounce(term, 300);
  const classes = useCompareStyles();

  useEffect(() => {
    (async () => {
      if (debouncedText !== "") {
        setIsLoading(true);
        const arrayOfPlayers = await playerService.getSearch(debouncedText);
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
  }, [debouncedText]);

  function handleListItemClick(value) {
    onClose(value);
  }

  let content;
  if (isLoading) content = false;
  else content = true;

  return (
    <Dialog open={open} onBackdropClick={onOutsideClick}>
      <DialogTitle id="compare-dialog-title">Add player to compare</DialogTitle>
      <div style={{ padding: "16px" }}>
        <Input
          inputProps={{
            "aria-label": "Search players"
          }}
          autoFocus
          value={term}
          type="search"
          fullWidth
          placeholder="Search players"
          onChange={event => setTerm(event.target.value)}
        />
      </div>
      <List
        className={classes.dialogList}
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
      >
        {!noPlayers ? (
          searchResults
            .slice(0, 8)
            .map(player => (
              <CompareDialogItem
                key={player[0]}
                player={player}
                handleListItemClick={handleListItemClick}
              />
            ))
        ) : (
          <Typography className={classes.message} variant="subtitle1">
            No players were found
          </Typography>
        )}
      </List>
    </Dialog>
  );
};

export default CompareDialog;
