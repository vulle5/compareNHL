import React from 'react';
import { Typography } from '@material-ui/core';

import { useTeamListStyles } from '../../styles/useStyles';

const TeamInfoHeader = ({ team, params }) => {
  const classes = useTeamListStyles();

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        alt="logo"
        className={classes.teamHeaderLogo}
        src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${params.id}.svg`}
      />
      <Typography variant="h5" style={{ margin: '8px 0px 8px 0px' }}>
        {team.name}
      </Typography>
      <Typography
        style={{ margin: '8px 0px 16px 0px' }}
        variant="subtitle1"
      >{`${team.conference.name}, ${team.division.name}`}</Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          maxWidth: '500px',
          margin: '8px auto'
        }}
      >
        <div>
          <Typography style={{ fontWeight: 'bold' }} variant="subtitle1">
            First Year
          </Typography>
          <Typography>{team.firstYearOfPlay}</Typography>
        </div>
        <div>
          <Typography style={{ fontWeight: 'bold' }} variant="subtitle1">
            Location
          </Typography>
          <Typography>{team.locationName}</Typography>
        </div>
        <div>
          <Typography style={{ fontWeight: 'bold' }} variant="subtitle1">
            Venue
          </Typography>
          <Typography>{team.venue.name}</Typography>
        </div>
      </div>
    </div>
  );
};

export default TeamInfoHeader;
