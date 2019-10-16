import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { playerInfoStyles } from '../../styles/jss-styles';

import { initializePlayer } from '../../reducers/playerReducer';
import { initializePlayerImage } from '../../reducers/playerImageReducer';
import PlayerInfoHeader from './PlayerInfoHeader';
import SeasonTable from './SeasonTable';
import FloatingActionButton from '../FAB';

const PlayerInfo = props => {
  // Get Player id from the React Router props and styles
  const {
    classes,
    match: {
      params: { playerId }
    },
    initializePlayer
  } = props;

  useEffect(() => {
    initializePlayer(playerId);
  }, [initializePlayer, playerId]);

  return (
    <div className={classes.wrapper}>
      <PlayerInfoHeader>
        <SeasonTable />
      </PlayerInfoHeader>
      <FloatingActionButton
        to={`/compare/${playerId}`}
        title="Compare"
        isLink
      />
    </div>
  );
};

function doPlayerInit(value) {
  return (dispatch, getState) => {
    let {
      player: { id }
    } = getState();

    if (id !== parseInt(value)) {
      dispatch(initializePlayer(value));
      dispatch(initializePlayerImage(value));
    }
  };
}

const mapDispatchToProps = dispatch => {
  return {
    initializePlayer: value => {
      dispatch(doPlayerInit(value));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(playerInfoStyles)(PlayerInfo));
