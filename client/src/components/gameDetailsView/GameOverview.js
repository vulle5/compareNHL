import React from 'react';
import { connect } from 'react-redux';
import GameOverviewPeriod from './GameOverviewPeriod';

const GameOverview = ({ periods }) => {
  if (!periods || !periods.length) {
    return <div>No periods have been played</div>;
  }

  return (
    <div>
      {periods.map(period => (
        <GameOverviewPeriod key={period.num} period={period} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  const {
    liveData: { linescore }
  } = state.gameDetail;
  return {
    periods: linescore.periods
  };
};

export default connect(mapStateToProps)(GameOverview);
