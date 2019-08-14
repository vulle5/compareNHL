import React, { useState } from "react";
import { Dialog, DialogTitle, List, Input } from "@material-ui/core";
import { useDebounce } from "use-debounce";
import { useSearchPlayer } from "../../functions/useSearchPlayer";
import { parseSearchResult } from "../../functions/parseSearchResult";
import CompareDialogItem from "./CompareDialogItem";

const CompareDialog = ({ onClose, open }) => {
  const [term, setTerm] = useState("");

  const [debouncedText] = useDebounce(term, 300);
  const arrayOfPlayers = useSearchPlayer(debouncedText);
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);

  function handleListItemClick(value) {
    onClose(value);
  }

  return (
    <Dialog open={open}>
      <DialogTitle id="compare-dialog-title">Add player to compare</DialogTitle>
      <div style={{ padding: "16px" }}>
        <Input
          inputProps={{
            "aria-label": "description"
          }}
          value={term}
          type="search"
          fullWidth
          placeholder="Search players"
          onChange={event => setTerm(event.target.value)}
        />
      </div>
      <List>
        {parsedPlayerIds.slice(0, 8).map(player => (
          <CompareDialogItem
            key={player[0]}
            player={player}
            handleListItemClick={handleListItemClick}
          />
        ))}
      </List>
    </Dialog>
  );
};

export default CompareDialog;
