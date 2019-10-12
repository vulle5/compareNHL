import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';

import { initializeGame } from '../../reducers/gameDetailReducer';
import { useGameDetailStyles } from '../../styles/useStyles';
import ErrorMessage from '../ErrorMessage';
import GameDetailHeader from './GameDetailHeader';
import GameDetailTabs from './GameDetailTabs';

const GameDetails = ({
  match: {
    params: { gamePk }
  },
  gameDetail,
  initializeGame
}) => {
  const classes = useGameDetailStyles();

  useEffect(() => {
    initializeGame(gamePk);
  }, [gamePk, initializeGame]);

  if (!gameDetail) {
    return <div style={{ paddingTop: '64px' }}>...Loading</div>;
  }

  if (gameDetail.errorMessage) {
    return <ErrorMessage />;
  }

  return (
    <div className={classes.root}>
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
