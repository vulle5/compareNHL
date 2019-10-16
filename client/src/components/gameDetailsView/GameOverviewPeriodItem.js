import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Avatar,
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

const GameOverviewPeriodItem = ({
  about,
  players,
  result,
  team,
  awayTeam,
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

  function findAssistName(players, result) {
    const player = players.filter(player => player.playerType === 'Assist');
    if (result.event === 'Penalty') {
      return `${result.penaltyMinutes} min - ${result.secondaryType}`;
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
          <Link to={`/player/${players[0].player.id}`}>
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
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={findPlayerName(players, result)}
          secondary={findAssistName(players, result)}
          style={{
            padding: '0px 8px',
            textAlign: team.id === awayTeam ? 'right' : 'left'
          }}
        />
        {highlightUrl && (
          <ListItemSecondaryAction
            style={{
              right: team.id === awayTeam ? 'calc(100% - 16px)' : '16px'
            }}
          >
            <IconButton
              edge={team.id === awayTeam ? 'start' : 'end'}
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
    const { url } = highlight.playbacks.find(video => video.width === '960');
    return { url: url, description: highlight.blurb };
  }

  return { url: null, description: null };
};

const mapStateToProps = (state, ownProps) => {
  const {
    gameData: { teams }
  } = state.gameDetail;
  const { url, description } = findGoalHighlight(
    state.gameHighlights.goalHighlights,
    ownProps.about.eventId
  );
  return {
    awayTeam: teams.away.id,
    highlightUrl: url,
    highlightDescription: description
  };
};

export default connect(
  mapStateToProps,
  { toggleDialog }
)(GameOverviewPeriodItem);
