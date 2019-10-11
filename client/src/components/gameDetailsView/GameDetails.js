import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initializeGame } from '../../reducers/gameDetailReducer';
import ErrorMessage from '../ErrorMessage';
import GameDetailHeader from './GameDetailHeader';

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

  if (!gameDetail) {
    return <div style={{ paddingTop: '64px' }}>...Loading</div>;
  }

  if (gameDetail.errorMessage) {
    return <ErrorMessage />;
  }

  return (
    <div style={{ paddingTop: '64px', maxWidth: '1000px', margin: 'auto' }}>
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
