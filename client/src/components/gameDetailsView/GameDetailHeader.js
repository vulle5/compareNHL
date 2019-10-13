import React from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { PlayCircleFilledOutlined } from '@material-ui/icons';
import moment from 'moment';

import { useGameDetailHeaderStyles } from '../../styles/useStyles';
import { toggleDialog } from '../../reducers/dialogReducer';

const GameDetailHeader = ({ gameDetail, status, toggleDialog }) => {
  const classes = useGameDetailHeaderStyles();

  const handleClickOpen = () => {
    toggleDialog(
      true,
      'http://md-akc.med.nhl.com/mp4/nhl/2019/10/13/c9494eae-c287-4c84-b396-4bf03f38976f/1570935465099/asset_1800k.mp4'
    );
  };

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
    <>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px'
        }}
      >
        <ListItem
          style={{ maxWidth: '233px' }}
          button
          onClick={handleClickOpen}
        >
          <ListItemAvatar>
            <Avatar>
              <PlayCircleFilledOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Watch Highlights</ListItemText>
        </ListItem>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    gameDetail: state.gameDetail,
    status: state.gameDetail.gameData.status
  };
};

export default connect(
  mapStateToProps,
  { toggleDialog }
)(GameDetailHeader);
