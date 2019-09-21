import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initializeTeams } from '../../reducers/teamReducer';
import { Link } from 'react-router-dom';

const TeamList = ({ initializeTeams, teams }) => {
  useEffect(() => {
    (async () => {
      initializeTeams();
    })();
  }, [initializeTeams]);

  if (!teams.length) {
    return <div>...Loading</div>;
  }

  return (
    <div style={{ display: 'flex', overflowY: 'auto', userSelect: 'none' }}>
      {teams.map(team => (
        <Link to={`/team/${team.id}`} key={team.id}>
          <img
            alt="logo"
            style={{ height: '40px', margin: '0px 4px 0px 4px' }}
            src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${team.id}.svg`}
          />
        </Link>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { initializeTeams }
)(TeamList);
