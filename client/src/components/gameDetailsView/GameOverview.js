import React from 'react';
import { connect } from 'react-redux';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import { get } from 'lodash';

import { useGameOverviewStyles } from '../../styles/useStyles';

const GameOverview = ({ periods, scoreAndPenaltyPlays }) => {
  const classes = useGameOverviewStyles();
  console.log(scoreAndPenaltyPlays);

  if (!periods || !periods.length) {
    return <div>No periods have been played</div>;
  }

  function findPlayerName(players, result) {
    const player = players.find(
      ({ playerType }) => playerType === 'PenaltyOn' || playerType === 'Scorer'
    );
    const seasonTotal =
      get(player, 'seasonTotal', 0) !== 0 ? `(${player.seasonTotal})` : '';
    const strength =
      get(result, 'strength.code', 'EVEN') !== 'EVEN'
        ? `(${result.strength.code})`
        : '';
    return `${get(
      player,
      'player.fullName',
      'No Name'
    )} ${seasonTotal} ${strength}`;
  }

  function findAssistName(players, result) {
    const player = players.filter(player => player.playerType === 'Assist');
    if (result.event === 'Penalty') {
      return `${result.penaltyMinutes} min, ${result.secondaryType}`;
    }
    if (player.length === 1) {
      return `${player[0].player.fullName} (${player[0].seasonTotal})`;
    }
    if (player.length === 2) {
      return `${player[0].player.fullName} (${player[0].seasonTotal}), ${player[1].player.fullName} (${player[1].seasonTotal})`;
    }
    return '';
  }

  function determinePeriodName(period) {
    if (period.ordinalNum === 'OT') {
      return 'Overtime';
    }
    return `${period.ordinalNum} period`;
  }

  return (
    <div>
      {periods.map(period => (
        <div key={period.num} className={classes.periodWrapper}>
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
            {scoreAndPenaltyPlays.map(({ about, players, result }) =>
              about.period === period.num ? (
                <div key={about.eventIdx} style={{ display: 'flex' }}>
                  <div style={{ alignSelf: 'center', width: '60px' }}>
                    <div>{about.periodTime}</div>
                    <div>{result.event}</div>
                  </div>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt="Player logo"
                        style={{ height: '45px', width: '45px' }}
                        src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${players[0].player.id}.jpg`}
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg';
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={findPlayerName(players, result)}
                      secondary={findAssistName(players, result)}
                      style={{ padding: '0px 8px' }}
                    />
                  </ListItem>
                </div>
              ) : null
            )}
          </List>
        </div>
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
