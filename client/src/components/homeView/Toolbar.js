import React from 'react';
import { useHistory } from "react-router-dom";
import { Tooltip, Typography, useTheme, Button, ButtonGroup } from '@material-ui/core';
import { ReactComponent as CardLogo } from '../../assets/cardViewButton.svg';
import { ReactComponent as ListLogo } from '../../assets/listViewButton.svg';
import { useToolbarStyles } from '../../styles/useStyles';

const ToolBar = ({viewStyle, setViewStyle}) => {
  const theme = useTheme();
  const { viewLogo, ...classes } = useToolbarStyles();

  function handleViewStyleCard() {
    if (viewStyle !== 'list') {
      return theme.palette.type === 'light' ? 'black' : 'white';
    }
    return 'rgb(142,142,142)';
  }

  function handleViewStyleList() {
    if (viewStyle !== 'card') {
      return theme.palette.type === 'light' ? 'black' : 'white';
    }
    return 'rgb(142,142,142)';
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <Typography style={{ marginRight: '16px' }}>View</Typography>
      <Tooltip title="Card" placement="top" classes={classes}>
        <CardLogo
          height="35"
          width="35"
          fill={handleViewStyleCard()}
          className={viewLogo}
          onClick={() => {
            setViewStyle('card');
            localStorage.setItem('scheduleViewStyle', 'card');
          }}
        />
      </Tooltip>
      <Tooltip title="List" placement="top" classes={classes}>
        <ListLogo
          height="35"
          width="35"
          className={viewLogo}
          fill={handleViewStyleList()}
          onClick={() => {
            setViewStyle('list');
            localStorage.setItem('scheduleViewStyle', 'list');
          }}
        />
      </Tooltip>
    </div>
  );
};

export default ToolBar;
