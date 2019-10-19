import React from 'react';
import { Typography } from '@material-ui/core';
import RosterTable from './RosterTable';

const RosterTableList = ({ players, teamName }) => {
  const forwards = players.filter(
    ({ position }) =>
      position.code === 'L' || position.code === 'C' || position.code === 'R'
  );
  const defense = players.filter(({ position }) => position.code === 'D');
  const goalies = players.filter(({ position }) => position.code === 'G');

  return (
    <div>
      <Typography
        variant="h4"
        style={{ textAlign: 'center', marginBottom: '24px' }}
      >
        {teamName}
      </Typography>
      <RosterTable players={forwards} tableTitle="Forwards" />
      <RosterTable players={defense} tableTitle="Defense" />
      <RosterTable players={goalies} tableTitle="Goalies" isGoalie />
    </div>
  );
};

export default RosterTableList;
