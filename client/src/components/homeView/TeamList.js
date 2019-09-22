import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initializeTeams } from '../../reducers/teamReducer';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

import { useTeamListStyles } from '../../styles/useStyles';

const TeamList = ({ initializeTeams, teams }) => {
  const classes = useTeamListStyles();

  useEffect(() => {
    initializeTeams();
  }, [initializeTeams]);

  if (!teams.length) {
    return <div>...Loading</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        overflowY: 'auto',
        userSelect: 'none',
        height: '80px'
      }}
    >
      {teams.map(team => (
        <div key={team.id} className={classes.root}>
          <Tooltip title={team.name} enterDelay={250}>
            <Link to={`/team/${team.id}`}>
              <img
                alt="logo"
                className={classes.listLogo}
                src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${team.id}.svg`}
              />
            </Link>
          </Tooltip>
        </div>
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
