import React, { useEffect } from 'react';
import { Paper, CircularProgress, useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';

import {
  updateGame,
  setSelected
} from '../../reducers/gameDetailReducer';
import { useGameDetailStyles } from '../../styles/useStyles';
import ErrorMessage from '../ErrorMessage';
import GameDetailHeader from './GameDetailHeader';
import GameDetailTabs from './GameDetailTabs';
import GameDetailsDialog from './GameDetailsDialog';
import useEventSource from '../../functions/useEventSource';

const GameDetails = ({
  match: {
    params: { gamePk }
  },
  loading,
  updateGame,
  gameObj,
  setSelected
}) => {
  const classes = useGameDetailStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.up('xs'));
  const [event, eventSource] = useEventSource(
    `/api/live/${gamePk}`,
    'liveGame'
  );

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    setSelected(gamePk);
    if (event) {
      const data = JSON.parse(event.data);
      updateGame(data);
      if (data.gameData.status.detailedState === 'Final') {
        eventSource.close();
      }
    }
  }, [event, eventSource, gamePk, setSelected, updateGame]);

  if (loading) {
    return (
      <div
        style={{ paddingTop: matches ? '64px' : '56px', textAlign: 'center' }}
      >
        <CircularProgress style={{ marginTop: '16px' }} />
      </div>
    );
  }

  if (gameObj.errorMessage) {
    return <ErrorMessage />;
  }

  return (
    <div className={classes.root}>
      <GameDetailsDialog />
      <Paper className={classes.paper}>
        <GameDetailHeader />
        <GameDetailTabs />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { gamePk }
    }
  } = ownProps;
  const gameDetail = state?.gameDetail?.games?.[gamePk];
  return {
    gameObj: state.gameDetail,
    loading: gameDetail?.gamePk !== state.gameDetail.selected
  };
};

export default connect(mapStateToProps, {
  updateGame,
  setSelected
})(GameDetails);
