import React from 'react';
import { Typography } from '@material-ui/core';
import TeamRosterPosList from './TeamRosterPosList';

const TeamRosterList = ({ roster }) => {
  const forwards = roster.filter(
    ({ position: { code } }) => code === 'L' || code === 'R' || code === 'C'
  );
  const defense = roster.filter(({ position: { code } }) => code === 'D');
  const goalies = roster.filter(({ position: { code } }) => code === 'G');

  return (
    <div style={{ width: '100%', maxWidth: 700, margin: '24px auto auto' }}>
      <Typography variant="h5" style={{ textAlign: 'center' }}>
        Roster
      </Typography>
      <TeamRosterPosList title="Forwards" players={forwards} />
      <TeamRosterPosList title="Defense" players={defense} />
      <TeamRosterPosList title="Goalies" players={goalies} />
    </div>
  );
};

export default TeamRosterList;
