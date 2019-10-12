import React from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import { get } from 'lodash';

import { useGameOverviewStyles } from '../../styles/useStyles';

const GameOverview = ({ periods, scoreAndPenaltyPlays }) => {
  const classes = useGameOverviewStyles();
  console.log(scoreAndPenaltyPlays);

  if (!periods || !periods.length) {
    return <div>No periods have been played</div>;
  }

  function findPlayerName(players) {
    const player = players.find(
      ({ playerType }) => playerType === 'PenaltyOn' || playerType === 'Scorer'
    );
    const seasonTotal =
      get(player, 'seasonTotal', 0) !== 0 ? `(${player.seasonTotal})` : '';
    return `${get(player, 'player.fullName', 'No Name')} ${seasonTotal}`;
  }

  function findAssistName(players) {
    const player = players.filter(player => player.playerType === 'Assist');
    if (player.length === 1) {
      return `${player[0].player.fullName} (${player[0].seasonTotal})`;
    }
    if (player.length === 2) {
      return `${player[0].player.fullName} (${player[0].seasonTotal}), ${player[1].player.fullName} (${player[1].seasonTotal})`;
    }
    return '';
  }

  return (
    <div>
      {periods.map(period => (
        <Paper key={period.num} className={classes.periodWrapper}>
          {scoreAndPenaltyPlays.map(({ about, players }) =>
            about.period === period.num ? (
              <div key={about.eventIdx}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ margin: '10px' }}>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={findPlayerName(players)}
                    secondary={findAssistName(players)}
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
