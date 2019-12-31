import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Paper, Divider, useMediaQuery } from '@material-ui/core';
import moment from 'moment';
import { get } from 'lodash';

import { useScheduleListItemStyles } from '../../../styles/useStyles';
import ScheduleListItemOverview from './ScheduleListItemOverview';

const ScheduleListItem = ({
  gamePk,
  status,
  home,
  away,
  gameDate,
  linescore
}) => {
  const classes = useScheduleListItemStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  function determineScore(homeOrAway) {
    if (
      status.detailedState === 'Final' ||
      status.detailedState === 'In Progress' ||
      status.detailedState === 'In Progress - Critical' ||
      status.detailedState === 'Game Over'
    ) {
      return (
        <Typography
          style={{
            marginRight: matches ? '40px' : '16px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginLeft: '24px'
          }}
        >
          {homeOrAway.score}
        </Typography>
      );
    } else {
      return (
        <Typography
          style={{
            marginRight: matches ? '40px' : '16px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginLeft: '24px'
          }}
        >
          -
        </Typography>
      );
    }
  }

  function determineGameState() {
    switch (status.detailedState) {
      case 'Scheduled' || 'In Preview':
        return moment(gameDate).format('HH:mm');
      case 'In Progress':
        return `${linescore.currentPeriodTimeRemaining} ${linescore.currentPeriodOrdinal}`;
      case 'In Progress - Critical':
        return `${linescore.currentPeriodTimeRemaining} ${linescore.currentPeriodOrdinal}`;
      default:
        return status.detailedState;
    }
  }

  return (
    <div className={classes.listRoot}>
      <Link to={`/gameDetails/${gamePk}`}>
        <Paper classes={{ root: classes.card }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ marginRight: '24px', width: '40px' }}>
              {determineGameState()}
            </Typography>
            <div style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img
                  alt="Team logo"
                  height="20"
                  style={{ marginRight: '4px' }}
                  src={`/api/teams/${home.team.id}/logo`}
                />
                <Typography style={matches ? { width: '35%' } : null}>
                  {home.team.name}
                </Typography>
                <div className={classes.overViewWrapper}>
                  {determineScore(home)}
                  {matches && status.detailedState !== 'Scheduled' && (
                    <ScheduleListItemOverview
                      first={get(linescore, 'periods[0].home', null)}
                      second={get(linescore, 'periods[1].home', null)}
                      third={get(linescore, 'periods[2].home', null)}
                      overtime={get(linescore, 'periods[3].home', null)}
                      shootout={get(linescore, 'shootoutInfo.home', null)}
                    />
                  )}
                </div>
              </div>
              <Divider style={{ margin: '8px 0px' }} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img
                  alt="Team logo"
                  height="20"
                  style={{ marginRight: '4px' }}
                  src={`/api/teams/${away.team.id}/logo`}
                />
                <Typography style={matches ? { width: '35%' } : null}>
                  {away.team.name}
                </Typography>
                <div className={classes.overViewWrapper}>
                  {determineScore(away)}
                  {matches && status.detailedState !== 'Scheduled' && (
                    <ScheduleListItemOverview
                      first={get(linescore, 'periods[0].away', null)}
                      second={get(linescore, 'periods[1].away', null)}
                      third={get(linescore, 'periods[2].away', null)}
                      overtime={get(linescore, 'periods[3].away', null)}
                      shootout={get(linescore, 'shootoutInfo.away', null)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Link>
    </div>
  );
};

export default ScheduleListItem;
