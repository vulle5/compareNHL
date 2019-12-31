import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CompareIcon from '@material-ui/icons/CompareArrows';
import { playerInfoStyles } from '../../styles/jss-styles';

import { initializePlayer } from '../../reducers/playerReducer';
import { initializePlayerImage } from '../../reducers/playerImageReducer';
import PlayerInfoHeader from './PlayerInfoHeader';
import SeasonTable from './SeasonTable';
import FloatingActionButton from '../FAB';
import ErrorMessage from '../ErrorMessage';

const PlayerInfo = props => {
  // Get Player id from the React Router props and styles
  const {
    classes,
    match: {
      params: { playerId }
    },
    initializePlayer,
    player
  } = props;

  useEffect(() => {
    initializePlayer(playerId);
  }, [initializePlayer, playerId]);

  if (player.errorMessage) {
    return <ErrorMessage />;
  }

  return (
    <div className={classes.wrapper}>
      <PlayerInfoHeader>
        <SeasonTable />
      </PlayerInfoHeader>
      <FloatingActionButton
        to={`/compare/${playerId}`}
        title="Compare"
        isLink
        Icon={CompareIcon}
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

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializePlayer: value => {
      dispatch(doPlayerInit(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(playerInfoStyles)(PlayerInfo));
