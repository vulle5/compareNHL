import React from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';

import { useGameOverviewStyles } from '../../styles/useStyles';

const GameOverview = ({ periods, scoreAndPenaltyPlays }) => {
  const classes = useGameOverviewStyles();
  console.log(scoreAndPenaltyPlays);

  if (!periods || !periods.length) {
    return <div>No periods have been played</div>;
  }

  return (
    <div>
      {periods.map(period => (
        <Paper key={period.num} className={classes.periodWrapper}>
          {scoreAndPenaltyPlays.map(({ about }) =>
            about.period === period.num ? (
              <div key={about.eventIdx}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ margin: '10px' }}>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Some Player"
                    secondary="First Assist, Second Assist"
                    style={{ paddingLeft: '8px' }}
                  />
                </ListItem>
              </div>
            ) : null
          )}
        </Paper>
      ))}
    </div>
  );
};

const getScoringAndPenaltyPlays = ({
  scoringPlays,
  penaltyPlays,
  allPlays
}) => {
  const scoreAndPenaltyPlays = [...scoringPlays, ...penaltyPlays].sort(
    (a, b) => a - b
  );
  return scoreAndPenaltyPlays.map(playId =>
    allPlays.find(({ about }) => about.eventIdx === playId)
  );
};

const mapStateToProps = state => {
  console.log(state.gameDetail);
  const {
    liveData: { linescore, plays }
  } = state.gameDetail;
  return {
    periods: linescore.periods || null,
    scoreAndPenaltyPlays: getScoringAndPenaltyPlays(plays)
  };
};

export default connect(mapStateToProps)(GameOverview);
