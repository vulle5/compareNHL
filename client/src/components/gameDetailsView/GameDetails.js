import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initializeGame } from '../../reducers/gameDetailReducer';
import ErrorMessage from '../ErrorMessage';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';

const GameDetails = ({
  match: {
    params: { gamePk }
  },
  gameDetail,
  initializeGame
}) => {
  useEffect(() => {
    initializeGame(gamePk);
  }, [gamePk, initializeGame]);
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  if (!gameDetail) {
    return <div>...Loading</div>;
  }

  if (gameDetail.errorMessage) {
    return <ErrorMessage />;
  }

  const {
    gameData: { teams },
    liveData: { linescore }
  } = gameDetail;
  return (
    <div style={{ paddingTop: '64px', maxWidth: '1000px', margin: 'auto' }}>
      <Paper
        style={{
          margin: matches ? '0px' : '16px',
          padding: matches ? '16px 8px' : '16px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: matches ? '0px' : '0px 10%'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '250px'
            }}
          >
            <img
              style={{ height: 'auto', width: '80%' }}
              src={`/api/teams/${teams.home.id}/logo`}
              alt="Home team logo"
            />
            <Typography
              variant="h6"
              style={{ textAlign: 'center', margin: '16px 0px' }}
            >
              {teams.home.name}
            </Typography>
          </div>
          <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h4">3 - 3</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '250px'
            }}
          >
            <img
              style={{ height: 'auto', width: '80%' }}
              src={`/api/teams/${teams.away.id}/logo`}
              alt="Away team logo"
            />
            <Typography
              variant="h6"
              style={{ textAlign: 'center', margin: '16px 0px' }}
            >
              {teams.away.name}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    gameDetail: state.gameDetail
  };
};

export default connect(
  mapStateToProps,
  { initializeGame }
)(GameDetails);
