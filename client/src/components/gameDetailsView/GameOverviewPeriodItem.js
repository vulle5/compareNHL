import React from 'react';
import { connect } from 'react-redux';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { PlayCircleFilledOutlined } from '@material-ui/icons';
import { get } from 'lodash';

const GameOverviewPeriodItem = ({ about, players, result, team, awayTeam }) => {
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
      return `${result.penaltyMinutes} min - ${result.secondaryType}`;
    }
    if (player.length === 1) {
      return `${player[0].player.fullName} (${player[0].seasonTotal})`;
    }
    if (player.length === 2) {
      return `${player[0].player.fullName} (${player[0].seasonTotal}), ${player[1].player.fullName} (${player[1].seasonTotal})`;
    }
    return '';
  }

  return (
    <div
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
          maxWidth: '360px',
          display: 'flex',
          flexDirection: team.id === awayTeam ? 'row-reverse' : 'row',
          paddingRight: team.id === awayTeam ? '16px' : '48px'
        }}
      >
        <ListItemAvatar
          style={{
            minWidth: 0,
            margin: team.id === awayTeam ? '0px 0px 0px 8px' : '0px 8px 0px 0px'
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
        <ListItemSecondaryAction
          style={{
            right: team.id === awayTeam ? 'calc(100% - 16px)' : '16px'
          }}
        >
          <IconButton
            edge={team.id === awayTeam ? 'start' : 'end'}
            aria-label="watch goal"
          >
            <PlayCircleFilledOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    gameData: { teams }
  } = state.gameDetail;
  return {
    awayTeam: teams.away.id
  };
};

export default connect(mapStateToProps)(GameOverviewPeriodItem);
