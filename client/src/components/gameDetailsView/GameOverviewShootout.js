import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';

import { useGameOverviewShootoutStyles } from '../../styles/useStyles';
import PlayerAvatar from '../PlayerAvatar';

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
                <Link to={`/player/${play.players[0].player.id}`}>
                  <PlayerAvatar
                    styles={{ height: '45px', width: '45px' }}
                    playerId={play.players[0].player.id}
                  />
                </Link>
              </ListItemAvatar>
              <ListItemText
                style={{
                  padding: '0px 8px',
                  textAlign: play.team.id === awayTeam ? 'right' : 'left'
                }}
                primary={
                  <>
                    <Link
                      to={`/player/${play.players[0].player.id}`}
                      className={classes.primaryText}
                    >{`${play.players[0].player.fullName}`}</Link>
                    {`${play.result.event === 'Goal' ? ' (GOAL)' : ''}`}
                  </>
                }
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
  const gamePk = state.gameDetail.selected;
  const {
    liveData: { plays },
    gameData: { teams }
  } = state.gameDetail.games[gamePk];
  if (plays.allPlays.length) {
    return {
      plays: getShootOutPlays(
        plays.playsByPeriod[plays.playsByPeriod.length - 1],
        plays.allPlays
      ),
      awayTeam: teams.away.id
    };
  } else {
    return {
      plays: [],
      awayTeam: null
    };
  }
};

export default connect(mapStateToProps)(GameOverviewShootout);
