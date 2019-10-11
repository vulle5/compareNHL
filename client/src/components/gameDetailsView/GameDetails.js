import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initializeGame } from '../../reducers/gameDetailReducer';

const GameDetails = ({
  match: {
    params: { gamePk }
  },
  initializeGame
}) => {
  useEffect(() => {
    initializeGame(gamePk);
  }, [gamePk, initializeGame]);

  return (
    <div style={{ marginTop: '64px' }}>
      <>GameDetails </>
      <>{gamePk}</>
    </div>
  );
};

export default connect(
  null,
  { initializeGame }
)(GameDetails);
