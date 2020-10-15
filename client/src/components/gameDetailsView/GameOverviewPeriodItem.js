import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography
} from '@material-ui/core';
import { PlayCircleFilledOutlined } from '@material-ui/icons';
import { toggleDialog } from '../../reducers/dialogReducer';
import { get } from 'lodash';
import { useGameOverviewPeriodItemStyles } from '../../styles/useStyles';
import PlayerAvatar from '../PlayerAvatar';

const GameOverviewPeriodItem = ({
  about,
  players,
  result,
  team,
  homeTeam,
  toggleDialog,
  highlightUrl,
  highlightDescription
}) => {
  const classes = useGameOverviewPeriodItemStyles();

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
    const emptyNet = get(result, 'emptyNet', '');
    return (
      <div>
        <Link
          to={`/player/${player.player.id}`}
          className={classes.primaryText}
        >
          {`${get(player, 'player.fullName', 'No Name')}`}
        </Link>
        {` ${seasonTotal} ${strength}
          ${emptyNet ? '(EN)' : ''}`}
      </div>
    );
  }

  function determinePenaltyColor(result) {
    if (result.penaltySeverity === 'Minor') {
      return classes.minorPenalty;
    }
    if (
      result.penaltySeverity === 'Major' ||
      result.penaltySeverity === 'Misconduct'
    ) {
      return classes.majorPenalty;
    }
    if (result.penaltySeverity === 'Game Misconduct') {
      return classes.gameMisconduct;
    }
    return classes.minorPenalty;
  }

  function findAssistName(players, result) {
    const player = players.filter(player => player.playerType === 'Assist');
    if (result.event === 'Penalty') {
      return (
        <Typography component={'span'} variant="body2">
          <span className={determinePenaltyColor(result)}>
            {result.penaltyMinutes}
          </span>
          <span className={classes.penaltyText}>{` - ${
            result.secondaryType.includes('Missing key')
              ? result.description
              : result.secondaryType
          }`}</span>
        </Typography>
      );
    }
    if (player.length === 1) {
      return (
        <Typography
          component={'span'}
          variant="body2"
          className={classes.secondaryText}
        >
          <Link to={`/player/${player[0].player.id}`}>
            {`${player[0].player.fullName}`}
          </Link>
          {` (${player[0].seasonTotal})`}
        </Typography>
      );
    }
    if (player.length === 2) {
      return (
        <Typography
          component={'span'}
          variant="body2"
          className={classes.secondaryText}
        >
          <Link to={`/player/${player[0].player.id}`}>
            {player[0].player.fullName}
          </Link>
          {` (${player[0].seasonTotal}), `}{' '}
          <Link to={`/player/${player[1].player.id}`}>
            {player[1].player.fullName}
          </Link>{' '}
          {` (${player[1].seasonTotal})`}
        </Typography>
      );
    }
    return '';
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: team.id === homeTeam ? 'row-reverse' : 'row'
      }}
    >
      <div
        style={{
          alignSelf: 'center',
          minWidth: '55px',
          textAlign: 'center'
        }}
      >
        <div className={classes.gameTimeText}>{about.periodTime}</div>
        <div>{result.event}</div>
      </div>
      <ListItem
        style={{
          width: '100%',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: team.id === homeTeam ? 'row-reverse' : 'row',
          paddingRight: team.id === homeTeam ? '16px' : '48px',
          paddingLeft: team.id === homeTeam ? '48px' : '16px'
        }}
      >
        <ListItemAvatar
          style={{
            minWidth: 0,
            margin: team.id === homeTeam ? '0px 0px 0px 8px' : '0px 8px 0px 0px'
          }}
        >
          <Link to={`/player/${players[0].player.id}`}>
            <PlayerAvatar
              styles={{ height: '45px', width: '45px' }}
              playerId={players[0].player.id}
            />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={findPlayerName(players, result)}
          secondary={findAssistName(players, result)}
          style={{
            padding: '0px 8px',
            textAlign: team.id === homeTeam ? 'right' : 'left'
          }}
        />
        {highlightUrl && (
          <ListItemSecondaryAction
            style={{
              right: team.id === homeTeam ? 'auto' : '16px',
              left: team.id === homeTeam ? '16px' : 'auto'
            }}
          >
            <IconButton
              edge={team.id === homeTeam ? 'start' : 'end'}
              aria-label="watch goal"
              onClick={() =>
                toggleDialog(true, highlightUrl, highlightDescription)
              }
            >
              <PlayCircleFilledOutlined />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </div>
  );
};

const findGoalHighlight = (highlights, eventId) => {
  if (!highlights || eventId === undefined) {
    return { url: null, description: null };
  }

  const highlight = highlights.find(highlight =>
    highlight.keywords.some(
      keyword =>
        keyword.type === 'statsEventId' && keyword.value === eventId.toString()
    )
  );
  if (highlight) {
    try {
      const { url } = highlight.playbacks.find(video =>
        video.name.includes('FLASH_1800K')
      );
      return { url: url, description: highlight.blurb };
    } catch (error) {
      return { url: null, description: null };
    }
  }
  return { url: null, description: null };
};

const mapStateToProps = (state, ownProps) => {
  const gamePk = state.gameDetail.selected;
  const {
    gameData: { teams }
  } = state.gameDetail.games[gamePk];
  const { url, description } = findGoalHighlight(
    state.gameHighlights.goalHighlights,
    ownProps.about.eventId
  );
  return {
    homeTeam: teams.home.id,
    highlightUrl: url,
    highlightDescription: description
  };
};

export default connect(
  mapStateToProps,
  { toggleDialog }
)(GameOverviewPeriodItem);
