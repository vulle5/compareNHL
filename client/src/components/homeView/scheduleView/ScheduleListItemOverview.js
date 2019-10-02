import React from 'react';
import { Typography } from '@material-ui/core';
import { get } from 'lodash';

const ScheduleListItemOverview = ({
  first,
  second,
  third,
  overtime,
  shootout
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Typography style={{ marginRight: '24px' }}>
        {get(first, 'goals', '-')}
      </Typography>
      <Typography style={{ marginRight: '24px' }}>
        {get(second, 'goals', '-')}
      </Typography>
      <Typography style={{ marginRight: '24px' }}>
        {get(third, 'goals', '-')}
      </Typography>
      {overtime && (
        <Typography style={{ marginRight: '24px' }}>
          {get(overtime, 'goals', '-')}
        </Typography>
      )}
      {shootout.attempts !== 0 && (
        <Typography style={{ marginRight: '24px' }}>
          {`(${get(shootout, 'scores', '(-)')})`}
        </Typography>
      )}
    </div>
  );
};

export default ScheduleListItemOverview;
