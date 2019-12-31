import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import GameOverviewPeriod from './GameOverviewPeriod';
import GameOverviewShootout from './GameOverviewShootout';
import { fetchGameHighlights } from '../../reducers/gameHighlightReducer';

const GameOverview = ({ periods, gamePk, fetchGameHighlights }) => {
  useEffect(() => {
    fetchGameHighlights(gamePk);
  }, [fetchGameHighlights, gamePk]);

  if (!periods || !periods.length) {
    return <div>No periods have been played</div>;
  }

  return (
    <div>
      {periods.map(period => (
        <GameOverviewPeriod key={period.num} period={period} />
      ))}
      <GameOverviewShootout />
    </div>
  );
};

const mapStateToProps = state => {
  const {
    liveData: { linescore },
    gamePk
  } = state.gameDetail;
  return {
    periods: linescore.periods,
    gamePk
  };
};

export default connect(
  mapStateToProps,
  { fetchGameHighlights }
)(GameOverview);
