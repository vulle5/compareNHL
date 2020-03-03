import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const HoverPopper = ({ text, textClass }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [position, setPosition] = React.useState(null);

  const handlePopoverOpen = event => {
    setPosition(event.currentTarget.getBoundingClientRect());
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = event => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ position: 'relative' }}>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >{text}</Typography>
      {anchorEl &&
        <div style={{ position: 'absolute', top: position.height, left: 0, zIndex: 1300 }}>
          <Paper style={{ padding: 16, height: 260, width: 250 }} elevation={8}>
            Hello
          </Paper>
        </div>
      }
    </div>
  );
};
export default HoverPopper;
