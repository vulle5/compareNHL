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

const GameOverview = ({
  periods,
  scoreAndPenaltyPlays,
  homeTeam,
  awayTeam
}) => {
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
            {scoreAndPenaltyPlays.map(({ about, players, result, team }) =>
              about.period === period.num ? (
                <div
                  key={about.eventIdx}
                  style={{
                    display: 'flex',
                    flexDirection: team.id === awayTeam ? 'row-reverse' : 'row'
                  }}
                >
                  <div
                    style={{
                      alignSelf: 'center',
                      minWidth: '55px',
                      textAlign: 'center'
                    }}
                  >
                    <div>{about.periodTime}</div>
                    <div>{result.event}</div>
                  </div>
                  <ListItem
                    style={{
                      width: '100%',
                      maxWidth: 360,
                      display: 'flex',
                      flexDirection:
                        team.id === awayTeam ? 'row-reverse' : 'row'
                    }}
                  >
                    <ListItemAvatar
                      style={{
                        minWidth: 0,
                        margin:
                          team.id === awayTeam
                            ? '0px 0px 0px 8px'
                            : '0px 8px 0px 0px'
                      }}
                    >
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
                      style={{
                        padding: '0px 8px',
                        textAlign: team.id === awayTeam ? 'right' : 'left'
                      }}
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
    liveData: { linescore, plays },
    gameData: { teams }
  } = state.gameDetail;
  return {
    periods: linescore.periods || null,
    scoreAndPenaltyPlays: getScoringAndPenaltyPlays(plays),
    homeTeam: teams.home.id,
    awayTeam: teams.away.id
  };
};

export default connect(mapStateToProps)(GameOverview);
