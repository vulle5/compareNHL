import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Divider, CircularProgress } from '@material-ui/core';
import moment from 'moment';
import 'moment-duration-format';

import { useGameDetailHeaderStyles } from '../../styles/useStyles';
import { toggleDialog } from '../../reducers/dialogReducer';
import HighlightsButton from './HighlightsButton';
import ThreeStars from './ThreeStars';

const GameDetailHeader = ({
  gameDetail,
  status,
  toggleDialog,
  recap,
  highlightIsFetching
}) => {
  const classes = useGameDetailHeaderStyles();
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    setHighlight(recap);
    return () => {
      toggleDialog(false, null, '');
    };
  }, [recap, toggleDialog]);

  const handleClickOpen = () => {
    toggleDialog(true, highlight, 'Highlights');
  };

  function determineGameState(linescore) {
    // If game is in progress
    if (
      status.detailedState === 'In Progress' ||
      status.detailedState === 'In Progress - Critical'
    ) {
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
    if (status.detailedState === 'Scheduled') {
      return moment(gameDetail.gameData.datetime.dateTime).format('MMM Do');
    }
    // If game is finished
    return status.detailedState;
  }

  function determineScore() {
    if (
      status.detailedState === 'Final' ||
      status.detailedState === 'In Progress' ||
      status.detailedState === 'In Progress - Critical' ||
      status.detailedState === 'Game Over'
    ) {
      return (
        <>
          <Typography variant="h3">{linescore.teams.away.goals}</Typography>
          <Typography variant="h3" style={{ margin: '0px 15%' }}>
            -
          </Typography>
          <Typography variant="h3">{linescore.teams.home.goals}</Typography>
        </>
      );
    } else {
      return (
        <Typography variant="h3">
          {moment(gameDetail.gameData.datetime.dateTime).format('HH:mm')}
        </Typography>
      );
    }
  }

  function determineHighlight() {
    if (highlight && !highlightIsFetching) {
      return <HighlightsButton handleClickOpen={handleClickOpen} />;
    }
    if (!highlight && highlightIsFetching) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '225px',
            height: '72px'
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    if (!highlight && !highlightIsFetching) {
      return null;
    }
  }

  const {
    gameData: { teams },
    liveData: { linescore }
  } = gameDetail;
  return (
    <>
      <div className={classes.headerWrapper}>
        <div className={classes.logoContainer}>
          <Link to={`/team/${teams.away.id}`} style={{ textAlign: 'center' }}>
            <img
              className={classes.teamLogo}
              src={`/api/teams/${teams.away.id}/logo`}
              alt="Away team logo"
            />
            <Typography variant="h6" className={classes.teamName}>
              {teams.away.name}
            </Typography>
          </Link>
        </div>
        <div className={classes.gameScore}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center',
              height: '100px'
            }}
          >
            {determineScore()}
            <Typography
              variant="h6"
              style={{
                margin: '0px 100%',
                paddingTop: '8px',
                textAlign: 'center',
                whiteSpace:
                  status.detailedState === 'Scheduled' ||
                  status.detailedState === 'Game Over'
                    ? 'nowrap'
                    : 'normal'
              }}
            >
              {determineGameState(linescore)}
            </Typography>
            {(status.detailedState === 'In Progress' ||
              status.detailedState === 'In Progress - Critical') && (
              <Typography className={classes.liveBanner}>LIVE</Typography>
            )}
          </div>
        </div>
        <div className={classes.logoContainer}>
          <Link to={`/team/${teams.home.id}`} style={{ textAlign: 'center' }}>
            <img
              className={classes.teamLogo}
              src={`/api/teams/${teams.home.id}/logo`}
              alt="Home team logo"
            />
            <Typography variant="h6" className={classes.teamName}>
              {teams.home.name}
            </Typography>
          </Link>
        </div>
      </div>
      <Divider style={{ margin: '32px 16px 16px 16px' }} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        {status.detailedState === 'Final' && (
          <>
            {determineHighlight()}
            <ThreeStars />
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  const gamePk = state.gameDetail.selected;
  const gameDetail = state.gameDetail.games[gamePk];
  return {
    gameDetail,
    status: gameDetail.gameData.status,
    recap: state.gameHighlights.recap,
    highlightIsFetching: state.gameHighlights.fetching
  };
};

export default connect(mapStateToProps, { toggleDialog })(GameDetailHeader);
