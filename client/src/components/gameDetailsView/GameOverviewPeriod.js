import React from 'react';
import { connect } from 'react-redux';
import { List, Typography } from '@material-ui/core';

import { useGameOverviewStyles } from '../../styles/useStyles';
import GameOverviewPeriodItem from './GameOverviewPeriodItem';

// TODO Maybe: Goalie changes.
/* 
  1: Check from boxscore goalies if team has more than 1 goalie if not do not check that team
  2: Search for first shot to the net for both away and home to find out the starting goalie (compare to #1 goalie array)
  3: Search next shot where goalie is different than before (compare to #1 goalie array)
  4: Check last stoppage of play from new goalie and check period of time
  5: Check from #5 stoppage last shot before that stoppage to check what goalie was on goal before
  6: Put the info to object 
*/
// TODO Maybe: Shootout goals
// TODO: Put game fetching to node js with 10 second cache-control
// TODO: Fix play goal highlight button in mobile and color penalties and goals
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
