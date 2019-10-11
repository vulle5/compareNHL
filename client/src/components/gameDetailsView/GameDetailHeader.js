import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';

import { useGameDetailHeaderStyles } from '../../styles/useStyles'

const GameDetailHeader = ({ gameDetail }) => {
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const classes = useGameDetailHeaderStyles()

  const {
    gameData: { teams },
    liveData: { linescore }
  } = gameDetail;
  return (
    <Paper
      className={classes.root}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: matches ? '0px' : '0px 10%'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '250px'
          }}
        >
          <img
            style={{ height: 'auto', width: '80%' }}
            src={`/api/teams/${teams.home.id}/logo`}
            alt="Home team logo"
          />
          <Typography
            variant="h6"
            style={{ textAlign: 'center', margin: '16px 0px' }}
          >
            {teams.home.name}
          </Typography>
        </div>
        <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h4">3 - 3</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '250px'
          }}
        >
          <img
            style={{ height: 'auto', width: '80%' }}
            src={`/api/teams/${teams.away.id}/logo`}
            alt="Away team logo"
          />
          <Typography
            variant="h6"
            style={{ textAlign: 'center', margin: '16px 0px' }}
          >
            {teams.away.name}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    gameDetail: state.gameDetail
  };
};

export default connect(mapStateToProps)(GameDetailHeader);
