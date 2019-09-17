import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from '@material-ui/core';

const CompareDialogItem = ({ player, handleListItemClick }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        button
        onClick={() => handleListItemClick(player[0])}
      >
        <ListItemAvatar>
          <Avatar
            alt="Player"
            src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
              player[0]
            }.jpg`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg';
            }}
          />
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
