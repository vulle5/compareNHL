import React, { useEffect } from 'react';
import { Paper, CircularProgress, useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';

import { initializeGame } from '../../reducers/gameDetailReducer';
import { useGameDetailStyles } from '../../styles/useStyles';
import ErrorMessage from '../ErrorMessage';
import GameDetailHeader from './GameDetailHeader';
import GameDetailTabs from './GameDetailTabs';
import GameDetailsDialog from './GameDetailsDialog';

const GameDetails = ({
  match: {
    params: { gamePk }
  },
  gameDetail,
  initializeGame
}) => {
  const classes = useGameDetailStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.up('xs'));

  useEffect(() => {
    initializeGame(gamePk);
  }, [gamePk, initializeGame]);

  if (!gameDetail) {
    return (
      <div
        style={{ paddingTop: matches ? '64px' : '56px', textAlign: 'center' }}
      >
        <CircularProgress style={{ marginTop: '16px' }} />
      </div>
    );
  }

  if (gameDetail.errorMessage) {
    return <ErrorMessage />;
  }

  return (
    <div className={classes.root}>
      <GameDetailsDialog />
      <Paper className={classes.paper}>
        <GameDetailHeader />
        <GameDetailTabs />
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
