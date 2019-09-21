import React from 'react';
import { Typography } from '@material-ui/core';

import ScheduleDayItem from './ScheduleDayItem';

const ScheduleDayList = ({ title }) => {
  return (
    <div style={{ marginTop: '24px' }}>
      <Typography variant="h4">{title}</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ScheduleDayItem home="CAR" away="FLA" display="0 - 0" />
        <ScheduleDayItem home="CHI" away="CAP" display="20:00" />
      </div>
    </div>
  );
};

export default ScheduleDayList;
