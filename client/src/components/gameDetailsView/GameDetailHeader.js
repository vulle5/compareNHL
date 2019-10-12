import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { useGameDetailHeaderStyles } from '../../styles/useStyles';

const GameDetailHeader = ({ gameDetail }) => {
  const classes = useGameDetailHeaderStyles();

  const {
    gameData: { teams },
    liveData: { linescore }
  } = gameDetail;
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.logoContainer}>
        <img
          className={classes.teamLogo}
          src={`/api/teams/${teams.home.id}/logo`}
          alt="Home team logo"
        />
        <Typography variant="h6" className={classes.teamName}>
          {teams.home.name}
        </Typography>
      </div>
      <div className={classes.gameScore}>
        <Typography variant="h3">{linescore.teams.home.goals}</Typography>
        <Typography variant="h3" style={{ margin: '0px 10%' }}>
          -
        </Typography>
        <Typography variant="h3">{linescore.teams.away.goals}</Typography>
      </div>
      <div className={classes.logoContainer}>
        <img
          className={classes.teamLogo}
          src={`/api/teams/${teams.away.id}/logo`}
          alt="Away team logo"
        />
        <Typography variant="h6" className={classes.teamName}>
          {teams.away.name}
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    gameDetail: state.gameDetail
  };
};

export default connect(mapStateToProps)(GameDetailHeader);
