import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-duration-format';
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  useMediaQuery
} from '@material-ui/core';

import defLogo from '../../../assets/defLogo.svg';
import teamServices from '../../../services/teams';
import { useScheduleCardItemStyles } from '../../../styles/useStyles';
import ScheduleCardItemOverview from './ScheduleCardItemOverview';

const ScheduleCardItem = ({
  home,
  away,
  status,
  gameDate,
  gamePk,
  linescore,
  teams
}) => {
  const [homeAbb, setHomeAbb] = useState('HOME');
  const [awayAbb, setAwayAbb] = useState('AWAY');
  const [homeTeam, setHomeTeam] = useState('Home');
  const [awayTeam, setAwayTeam] = useState('Away');
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useScheduleCardItemStyles();

  // Constants
  const gameLive = status.detailedState === 'In Progress' ||
  status.detailedState === 'In Progress - Critical';

  const findTeamName = useCallback(
    async teamToSearch => {
      if (teams.length) {
        try {
          const { teamName, abbreviation } = teams.find(
            team => team.id === teamToSearch.team.id
          );
          return [teamName, abbreviation];
        } catch (error) {
          const {
            teams: {
              0: { teamName }
            }
          } = await teamServices.getTeam(teamToSearch.team.id, '');
          return [teamName, null];
        }
      }
      return ['No Team', null];
    },
    [teams]
  );

  useEffect(() => {
    (async () => {
      const [homeTeamName, homeAbb] = await findTeamName(home);
      const [awayTeamName, awayAbb] = await findTeamName(away);
      setHomeTeam(homeTeamName);
      setAwayTeam(awayTeamName);
      setHomeAbb(homeAbb);
      setAwayAbb(awayAbb);
    })();
  }, [away, home, findTeamName]);

  function determineScore() {
    if (
      status.detailedState === 'Final' ||
      status.detailedState === 'In Progress' ||
      status.detailedState === 'In Progress - Critical' ||
      status.detailedState === 'Game Over'
    ) {
      return (
        <>
          <Typography variant={matches ? 'h5' : 'h4'}>{home.score}</Typography>
          <Typography
            variant={matches ? 'h5' : 'h4'}
            style={{ margin: '0px 32px' }}
          >
            -
          </Typography>
          <Typography variant={matches ? 'h5' : 'h4'}>{away.score}</Typography>
        </>
      );
    } else {
      return (
        <Typography variant={matches ? 'h5' : 'h4'}>
          {moment(gameDate).format('HH:mm')}
        </Typography>
      );
    }
  }

  function determineGameType(gamePk) {
    const gameType = gamePk.substring(4, 6);
    switch (gameType) {
      case '01':
        return 'Pre-season';
      case '02':
        return 'Regular';
      case '03':
        return 'Playoffs';
      case '04':
        return 'All-star';
      default:
        return '';
    }
  }

  function determineGameState() {
    // powerPlay: for powerplay stats
    // goaliePulled: for empty net stat

    // If game is in progress
    if (gameLive) {
      const intermissionTime = moment.duration(
        linescore.intermissionInfo.intermissionTimeRemaining,
        'seconds'
      );
      return `${
        linescore.intermissionInfo.inIntermission
          ? 'Intermission'
          : linescore.currentPeriodOrdinal
      } · ${
        linescore.intermissionInfo.inIntermission
          ? intermissionTime.format('mm:ss')
          : linescore.currentPeriodTimeRemaining
      }`;
    }
    // If game is finished
    if (status.detailedState === 'Final') {
      return `${status.detailedState}${
        linescore.currentPeriodOrdinal !== '3rd'
          ? ` · ${linescore.currentPeriodOrdinal}`
          : ''
      }`;
    }
    return status.detailedState;
  }

  function determineLeagueScore() {
    if (
      status.detailedState === 'Final' ||
      status.detailedState === 'Game Over'
    ) {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '12px' }}>{`(${home.leagueRecord.wins ||
            '0'}-${home.leagueRecord.losses || '0'}-${home.leagueRecord.ot ||
            '0'})`}</div>
          <div style={{ fontSize: '12px' }}>{`(${away.leagueRecord.wins ||
            '0'}-${away.leagueRecord.losses || '0'}-${away.leagueRecord.ot ||
            '0'})`}</div>
        </div>
      );
    }
    return null;
  }

  return (
    <Card className={classes.gameCard}>
      <Link to={`/game/${gamePk}`}>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {<div className={gameLive ? classes.liveBanner : null}>
              <Typography style={{ fontWeight: 'inherit' }} variant="subtitle1">
                {gameLive ? 'LIVE' :determineGameType(gamePk.toString())}
              </Typography>
            </div>}
            <Typography  variant="subtitle1">{determineGameState()}</Typography>
          </div>
          <div className={classes.scoreLogoWrapper}>
            <div>
              <Avatar
                className={classes.teamLogo}
                imgProps={{
                  style: {
                    position: 'absolute',
                    width: '145%',
                    backgroundColor: ' rgba(0, 0, 0, 0)'
                  }
                }}
                src={`/api/teams/${home.team.id}/logo`}
                alt="Team"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = defLogo;
                }}
              />
            </div>
            <div style={{ display: 'flex' }}>{determineScore()}</div>
            <div>
              <Avatar
                className={classes.teamLogo}
                imgProps={{
                  style: {
                    position: 'absolute',
                    width: '145%',
                    backgroundColor: ' rgba(0, 0, 0, 0)'
                  }
                }}
                src={`/api/teams/${away.team.id}/logo`}
                alt="Team"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = defLogo;
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ textAlign: 'center' }} variant="subtitle1">
              {`@${homeTeam}`}
            </Typography>
            <Typography style={{ textAlign: 'center' }} variant="subtitle1">
              {awayTeam}
            </Typography>
          </div>
          {determineLeagueScore()}
          {(status.detailedState === 'Final' ||
            status.detailedState === 'In Progress' ||
            status.detailedState === 'In Progress - Critical' ||
            status.detailedState === 'Game Over') && (
            <>
              <Divider style={{ margin: '12px 0px' }} />
              <ScheduleCardItemOverview
                homeAbb={homeAbb}
                awayAbb={awayAbb}
                first={linescore.periods[0]}
                second={linescore.periods[1]}
                third={linescore.periods[2]}
                overtime={linescore.periods[3]}
                shootout={linescore.shootoutInfo}
              />
            </>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(mapStateToProps)(ScheduleCardItem);
