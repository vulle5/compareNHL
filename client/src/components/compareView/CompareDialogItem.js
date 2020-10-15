import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@material-ui/core';
import PlayerAvatar from '../PlayerAvatar';

const CompareDialogItem = ({ player, handleListItemClick }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        button
        onClick={() => handleListItemClick(player[0])}
      >
        <ListItemAvatar>
          <PlayerAvatar playerId={player[0]} />
        </ListItemAvatar>
        <ListItemText
          primary={`${player[2]} ${player[1]}`}
          secondary={player[10]}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default CompareDialogItem;
