import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  Input,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { useDebounce } from "use-debounce";
import { useCompareStyles } from "../../styles/useStyles";
import { useSearchPlayer } from "../../functions/useSearchPlayer";
import { parseSearchResult } from "../../functions/parseSearchResult";
import CompareDialogItem from "./CompareDialogItem";

const CompareDialog = ({ onClose, open, onOutsideClick }) => {
  const [term, setTerm] = useState("");
  const [noPlayers, setNoPlayers] = useState(false);

  const [debouncedText] = useDebounce(term, 300);
  const classes = useCompareStyles();
  const arrayOfPlayers = useSearchPlayer(debouncedText);
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);

  useEffect(() => {
    if (typeof arrayOfPlayers === "string") {
      setNoPlayers(true);
    } else {
      setNoPlayers(false);
    }
  }, [arrayOfPlayers]);

  function handleListItemClick(value) {
    onClose(value);
  }

  return (
    <Dialog open={open} onBackdropClick={onOutsideClick}>
      <DialogTitle id="compare-dialog-title">Add player to compare</DialogTitle>
      <div style={{ padding: "16px" }}>
        <Input
          inputProps={{
            "aria-label": "Search players"
          }}
          value={term}
          type="search"
          fullWidth
          placeholder="Search players"
          onChange={event => setTerm(event.target.value)}
        />
      </div>
      <List className={classes.dialogList}>
        {noPlayers ? (
          <Typography variant="subtitle1">{arrayOfPlayers}</Typography>
        ) : parsedPlayerIds.length === 0 && term.length !== 0 ? (
          <CircularProgress />
        ) : (
          parsedPlayerIds
            .slice(0, 8)
            .map(player => (
              <CompareDialogItem
                key={player[0]}
                player={player}
                handleListItemClick={handleListItemClick}
              />
            ))
        )}
      </List>
    </Dialog>
  );
};

export default CompareDialog;
