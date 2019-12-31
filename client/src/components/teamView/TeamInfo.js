import React, { useState, useEffect } from 'react';
import { Card, CircularProgress, Divider } from '@material-ui/core';

import teamServices from '../../services/teams';
import TeamInfoHeader from './TeamInfoHeader';
import TeamRosterList from './TeamRosterList';
import { useTeamStyles } from '../../styles/useStyles';

const TeamInfo = ({ match: { params } }) => {
  const [team, setTeam] = useState([]);
  const classes = useTeamStyles();

  useEffect(() => {
    (async () => {
      const { teams } = await teamServices.getTeam(
        params.id,
        '?expand=team.roster'
      );
      setTeam(teams[0]);
    })();
  }, [params.id]);

  if (!team.id) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Card style={{ padding: '16px', margin: '12px' }}>
        <TeamInfoHeader team={team} params={params} />
        <Divider style={{ maxWidth: '700px', margin: 'auto' }} />
        {team.roster && <TeamRosterList roster={team.roster.roster} />}
      </Card>
    </div>
  );
};

export default TeamInfo;
