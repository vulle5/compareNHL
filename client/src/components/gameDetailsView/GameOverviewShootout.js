import React from 'react';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography
} from '@material-ui/core';

import { useGameOverviewShootoutStyles } from '../../styles/useStyles';

const GameOverviewShootout = ({ plays, awayTeam }) => {
  const classes = useGameOverviewShootoutStyles();

  if (!plays.length) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <Typography variant="h6" style={{ marginBottom: '16px' }}>
        Shootout
      </Typography>
      <List>
        {plays.map(play => (
          <div
            key={play.about.eventId}
            style={{
              display: 'flex',
              flexDirection: play.team.id === awayTeam ? 'row-reverse' : 'row'
            }}
          >
            <ListItem
              style={{
                width: '100%',
                maxWidth: 360,
                display: 'flex',
                flexDirection: play.team.id === awayTeam ? 'row-reverse' : 'row'
              }}
            >
              <ListItemAvatar
                style={{
                  minWidth: 0,
                  margin:
                    play.team.id === awayTeam
                      ? '0px 0px 0px 8px'
                      : '0px 8px 0px 0px'
                }}
              >
                <Avatar
                  alt="Player logo"
                  style={{ height: '45px', width: '45px' }}
                  src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${play.players[0].player.id}.jpg`}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg';
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                style={{
                  padding: '0px 8px',
                  textAlign: play.team.id === awayTeam ? 'right' : 'left'
                }}
                primary={`${play.players[0].player.fullName}${
                  play.result.event === 'Goal' ? ' (GOAL)' : ''
                }`}
                secondary={play.result.description}
              />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

const getShootOutPlays = (shootoutIds, allPlays) => {
  return shootoutIds.plays
    .map(playId => allPlays.find((_, index) => index === playId))
    .filter(play => play.players && play.about.period === 5);
};

const mapStateToProps = state => {
  const {
    liveData: { plays },
    gameData: { teams }
  } = state.gameDetail;
  return {
    plays: getShootOutPlays(
      plays.playsByPeriod[plays.playsByPeriod.length - 1],
      plays.allPlays
    ),
    awayTeam: teams.away.id
  };
};

export default connect(mapStateToProps)(GameOverviewShootout);