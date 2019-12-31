import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { PlayCircleFilledOutlined } from '@material-ui/icons';

const HighlightsButton = ({ handleClickOpen }) => {
  return (
    <ListItem
      style={{
        maxWidth: '225px',
        maxHeight: '72px',
        margin: '16px 0px 24px 0px'
      }}
      button
      onClick={handleClickOpen}
    >
      <ListItemAvatar>
        <Avatar>
          <PlayCircleFilledOutlined />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>Watch Highlights</ListItemText>
    </ListItem>
  );
};

export default HighlightsButton;
