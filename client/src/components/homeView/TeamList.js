import React, { useState, useEffect } from 'react';
import teamService from '../../services/teams';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    (async () => {
      const { teams } = await teamService.getTeams();
      setTeams(teams);
    })();
  }, [teams.length]);

  if (!teams.length) {
    return <div>...Loading</div>;
  }

  console.log(teams);

  return (
    <div style={{ display: 'flex', overflowY: 'auto', userSelect: 'none' }}>
      {teams.map(team => (
        <div key={team.id}>
          <img
            alt="logo"
            style={{ height: '40px', margin: '0px 4px 0px 4px' }}
            src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${team.id}.svg`}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamList;
