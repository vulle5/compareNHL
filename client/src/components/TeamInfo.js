import React, { useState, useEffect } from 'react';
import { Card, Typography, CircularProgress } from '@material-ui/core';

import teamServices from '../services/teams';

const TeamInfo = ({ match: { params } }) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    (async () => {
      const { teams } = await teamServices.getTeam(params.id);
      setTeam(teams[0]);
    })();
  }, [params.id]);

  console.log(team);
  if (!team.id) {
    return <CircularProgress />;
  }

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: 'auto',
        paddingTop: '64px'
      }}
    >
      <Card style={{ padding: '16px', margin: '12px', textAlign: 'center' }}>
        <img
          alt="logo"
          style={{ height: '128px', margin: '0px 4px 0px 4px' }}
          src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${params.id}.svg`}
        />
        <Typography variant="h5">{team.name}</Typography>
      </Card>
    </div>
  );
};

export default TeamInfo;
