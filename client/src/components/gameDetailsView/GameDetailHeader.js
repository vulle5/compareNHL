import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { PlayCircleFilledOutlined } from '@material-ui/icons';
import moment from 'moment';

import { useGameDetailHeaderStyles } from '../../styles/useStyles';
import { toggleDialog } from '../../reducers/dialogReducer';
import contentService from '../../services/content';

const GameDetailHeader = ({ gameDetail, status, toggleDialog }) => {
  const classes = useGameDetailHeaderStyles();
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { media } = await contentService.getContent(gameDetail.gamePk);
        const { items } = media.epg.find(media => media.title === 'Recap');
        const { playbacks } = items.find(item => item.type === 'video');
        const { url } = playbacks.find(video => video.width === '960');
        setHighlight(url);
      } catch (error) {
        setHighlight(null);
      }
    })();
    return () => toggleDialog(false, null);
  }, [gameDetail.gamePk, toggleDialog]);

  const handleClickOpen = () => {
    toggleDialog(true, highlight);
  };

  function determineGameState() {
    // If game is in progress
    if (status.detailedState === 'In Progress') {
      const intermissionTime = moment.duration(
        linescore.intermissionInfo.intermissionTimeRemaining,
        'seconds'
      );
      return `${
        linescore.intermissionInfo.inIntermission
          ? 'Intermission'
          : linescore.currentPeriodOrdinal
      } ${
        linescore.intermissionInfo.inIntermission
          ? intermissionTime.format('mm:ss')
          : linescore.currentPeriodTimeRemaining
      }`;
    }
    // If game is finished
    return status.detailedState;
  }

  const {
    gameData: { teams },
    liveData: { linescore }
  } = gameDetail;
  return (
    <>
      <div className={classes.headerWrapper}>
        <div className={classes.logoContainer}>
          <img
            className={classes.teamLogo}
            src={`/api/teams/${teams.home.id}/logo`}
            alt="Home team logo"
          />
          <Typography variant="h6" className={classes.teamName}>
            {teams.home.name}
          </Typography>
        </div>
        <div className={classes.gameScore}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h3">{linescore.teams.home.goals}</Typography>
            <Typography variant="h3" style={{ margin: '0px 15%' }}>
              -
            </Typography>
            <Typography variant="h3">{linescore.teams.away.goals}</Typography>
            <Typography
              variant="h6"
              style={{ margin: '0px 100%', paddingTop: '8px' }}
            >
              {determineGameState()}
            </Typography>
          </div>
        </div>
        <div className={classes.logoContainer}>
          <img
            className={classes.teamLogo}
            src={`/api/teams/${teams.away.id}/logo`}
            alt="Away team logo"
          />
          <Typography variant="h6" className={classes.teamName}>
            {teams.away.name}
          </Typography>
        </div>
      </div>
      {highlight && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <ListItem
            style={{ maxWidth: '233px' }}
            button
            onClick={handleClickOpen}
          >
            <ListItemAvatar>
              <Avatar>
                <PlayCircleFilledOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Watch Highlights</ListItemText>
          </ListItem>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    gameDetail: state.gameDetail,
    status: state.gameDetail.gameData.status
  };
};

export default connect(
  mapStateToProps,
  { toggleDialog }
)(GameDetailHeader);
