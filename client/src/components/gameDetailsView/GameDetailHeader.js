import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import moment from 'moment';

import { useGameDetailHeaderStyles } from '../../styles/useStyles';

const GameDetailHeader = ({ gameDetail, status }) => {
  const classes = useGameDetailHeaderStyles();

  function determineGameState() {
    // If game is in progress
    if (status.detailedState === 'In Progress') {
      const intermissionTime = moment.duration(
        linescore.intermissionInfo.intermissionTimeRemaining,
        'seconds'
      );
      return `${
        linescore.intermissionInfo.inIntermission
          ? 'Intermission'
          : linescore.currentPeriodOrdinal
      } ${
        linescore.intermissionInfo.inIntermission
          ? intermissionTime.format('mm:ss')
          : linescore.currentPeriodTimeRemaining
      }`;
    }
    // If game is finished
    return status.detailedState;
  }

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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h3">{linescore.teams.home.goals}</Typography>
          <Typography variant="h3" style={{ margin: '0px 15%' }}>
            -
          </Typography>
          <Typography variant="h3">{linescore.teams.away.goals}</Typography>
          <Typography
            variant="h6"
            style={{ margin: '0px 100%', paddingTop: '8px' }}
          >
            {determineGameState()}
          </Typography>
        </div>
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
    gameDetail: state.gameDetail,
    status: state.gameDetail.gameData.status
  };
};

export default connect(mapStateToProps)(GameDetailHeader);
