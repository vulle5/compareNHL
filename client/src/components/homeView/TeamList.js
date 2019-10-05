import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';

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
        <div key={team.id} className={classes.teamListWrapper}>
          <Tooltip title={team.name} enterDelay={250}>
            <Link to={`/team/${team.id}`}>
              <SVG
                alt="logo"
                title={`${team.name}`}
                className={classes.listLogo}
                preProcessor={code =>
                  team.id === 14
                    ? code.replace(/fill=".*?"/g, 'fill="#003D7C"')
                    : code
                }
                src={`/api/teams/${team.id}/logo`}
              />
            </Link>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { initializeTeams }
)(TeamList);
