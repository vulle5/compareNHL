import React from 'react';
import { Typography, Card, CardContent, Avatar } from '@material-ui/core';

const ScheduleDayItem = ({ home, away, display }) => {
  return (
    <Card style={{ width: '288px', margin: '16px 16px 0px 0px' }}>
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100px',
          alignItems: 'center',
          padding: '16px'
        }}
      >
        <div>
          <Avatar
            style={{ width: '60px' }}
            src="https://www-league.nhlstatic.com/images/logos/teams-current-circle/12.svg"
          />
          <Typography style={{ textAlign: 'center' }} variant="subtitle1">
            {home}
          </Typography>
        </div>
        <Typography variant="h5">{display}</Typography>
        <div>
          <Avatar
            style={{ width: '60px' }}
            src="https://www-league.nhlstatic.com/images/logos/teams-current-circle/13.svg"
          />
          <Typography style={{ textAlign: 'center' }} variant="subtitle1">
            {away}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleDayItem;
