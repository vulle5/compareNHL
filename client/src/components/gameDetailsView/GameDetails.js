import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initializeGame } from '../../reducers/gameDetailReducer';
import { useGameDetailStyles } from '../../styles/useStyles'
import ErrorMessage from '../ErrorMessage';
import GameDetailHeader from './GameDetailHeader';

const GameDetails = ({
  match: {
    params: { gamePk }
  },
  gameDetail,
  initializeGame
}) => {
  const classes = useGameDetailStyles()

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
      <GameDetailHeader />
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
