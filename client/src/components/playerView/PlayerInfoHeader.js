import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { playerInfoHeader } from '../../styles/jss-styles';
import getCountryISO2 from '../../functions/iso3toIso2';

const PlayerInfoHeader = ({ classes, player, playerImage, children }) => {
  if (isEmpty(player)) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper className={classes.root} elevation={1}>
      {playerImage ? (
        <img
          className={classes.playerThumbnail}
          src={`data:image/jpg;base64, ${playerImage}`}
          alt="Player"
        />
      ) : (
        <div className={classes.loadingThumbnail} />
      )}
      <div className={classes.logoWrapper}>
        <object
          title={`Flag of ${player.nationality}`}
          style={{ maxWidth: '48px', maxHeight: '48px' }}
          aria-label={`Country flag of ${player.nationality}`}
          type="image/png"
          typemustmatch=""
          data={`https://www.countryflags.io/${getCountryISO2(
            player.nationality
          )}/shiny/48.png`}
        ></object>
        <Typography variant="h5" component="h3" className={classes.playerName}>
          {`${player.fullName} #${player.primaryNumber}`}
        </Typography>
      </div>
      <div style={{ display: 'inline-block' }}>
        <Link
          to={`/team/${player.currentTeam.id}`}
          className={classes.logoWrapper}
        >
          {player.currentTeam.id !== 'N/A' && (
            <img
              height="35"
              src={`/api/teams/${player.currentTeam.id}/logo`}
              alt="team"
            />
          )}
          <Typography style={{ alignSelf: 'center' }} component="p">
            {player.active ? player.currentTeam.name : 'Not Active'}
          </Typography>
        </Link>
      </div>
      <ul className={classes.mainStats}>
        <li className={classes.mainStatsLi}>
          <Typography component="p">{`Pos: ${player.primaryPosition.abbreviation}`}</Typography>
        </li>
        <li className={classes.mainStatsLi}>
          <Typography component="p">{`${player.height}, ${player.metricHeight} cm`}</Typography>
        </li>
        <li className={classes.mainStatsLi}>
          <Typography component="p">{`${player.weight} lbs, ${player.metricWeight} kg`}</Typography>
        </li>
        <li className={classes.mainStatsLi}>
          <Typography component="p">{`Age: ${player.currentAge}`}</Typography>
        </li>
      </ul>
      {children}
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    player: state.player,
    playerImage: state.playerImage
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(playerInfoHeader)(PlayerInfoHeader));
