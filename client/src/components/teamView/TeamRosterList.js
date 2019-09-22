import React from 'react';

const TeamRosterList = ({ roster }) => {
  console.log(roster);
  return (
    <div>
      {roster.map(player => (
        <div key={player.person.id}>{player.person.fullName}</div>
      ))}
    </div>
  );
};

export default TeamRosterList;
