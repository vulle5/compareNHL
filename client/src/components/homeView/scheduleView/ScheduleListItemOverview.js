import React from 'react';
import { Typography } from '@material-ui/core';

const ScheduleListItemOverview = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Typography style={{ marginRight: '24px' }}>1</Typography>
      <Typography style={{ marginRight: '24px' }}>0</Typography>
      <Typography style={{ marginRight: '24px' }}>1</Typography>
      <Typography style={{ marginRight: '24px' }}>0</Typography>
      <Typography style={{ marginRight: '24px' }}>(3)</Typography>
    </div>
  );
};

export default ScheduleListItemOverview;
