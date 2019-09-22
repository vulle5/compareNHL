import React, { useState, useEffect } from 'react';
import { Card, CircularProgress } from '@material-ui/core';

import teamServices from '../../services/teams';
import TeamInfoHeader from './TeamInfoHeader';

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
        <TeamInfoHeader team={team} params={params} />
      </Card>
    </div>
  );
};

export default TeamInfo;
