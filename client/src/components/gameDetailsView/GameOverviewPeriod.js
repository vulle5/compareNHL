import React from 'react';
import { connect } from 'react-redux';
import { List, Typography } from '@material-ui/core';

import { useGameOverviewStyles } from '../../styles/useStyles';
import GameOverviewPeriodItem from './GameOverviewPeriodItem';

// TODO Maybe: Goalie changes
// TODO Maybe: Shootout goals
// TODO: Three stars
// TODO: Put game fetching to node js with 10 second cache-control
const GameOverviewPeriod = ({ period, scoreAndPenaltyPlays }) => {
  const classes = useGameOverviewStyles();

  function determinePeriodName(period) {
    if (period.ordinalNum === 'OT') {
      return 'Overtime';
    }
    return `${period.ordinalNum} period`;
  }

  return (
    <div className={classes.periodWrapper}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <Typography variant="h6">{determinePeriodName(period)}</Typography>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6">{period.home.goals}</Typography>
          <Typography variant="h6" style={{ margin: '0px 12px' }}>
            -
          </Typography>
          <Typography variant="h6">{period.away.goals}</Typography>
        </div>
      </div>
      <List>
        {scoreAndPenaltyPlays.map(({ about, players, result, team }) =>
          about.period === period.num ? (
            <GameOverviewPeriodItem
              key={about.eventIdx}
              about={about}
              players={players}
              result={result}
              team={team}
            />
          ) : null
        )}
      </List>
    </div>
  );
};

const getScoringAndPenaltyPlays = ({
  scoringPlays,
  penaltyPlays,
  allPlays
}) => {
  try {
    const scoreAndPenaltyPlays = [...scoringPlays, ...penaltyPlays].sort(
      (a, b) => a - b
    );
    return scoreAndPenaltyPlays.map(playId =>
      allPlays.find((_, index) => index === playId)
    );
  } catch (error) {
    return [];
  }
};

const mapStateToProps = state => {
  const {
    liveData: { plays }
  } = state.gameDetail;
  return {
    scoreAndPenaltyPlays: getScoringAndPenaltyPlays(plays)
  };
};

export default connect(mapStateToProps)(GameOverviewPeriod);
