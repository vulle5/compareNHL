import React from 'react';

const GameDetails = ({
  match: {
    params: { gamePk }
  }
}) => {
  return (
    <div style={{ marginTop: '64px' }}>
      <>GameDetails </>
      <>{gamePk}</>
    </div>
  );
};

export default GameDetails;
