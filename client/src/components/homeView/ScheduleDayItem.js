import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import json2mq from 'json2mq';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider
} from '@material-ui/core';

import defLogo from '../../assets/defLogo.svg';
import teamServices from '../../services/teams';
// import { useScheduleDayItemStyles } from '../../styles/useStyles';
import GameOverviewTable from './GameOverviewTable';

const ScheduleDayItem = ({
  home,
  away,
  status,
  gameDate,
  gamePk,
  linescore,
  teams
}) => {
  const [homeAbb, setHomeAbb] = useState('');
  const [awayAbb, setAwayAbb] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const {
    palette: { type }
  } = useTheme();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 768
    })
  );
  // const classes = useScheduleDayItemStyles();

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
          return [teamName, 'DEF'];
        }
      }
      return ['No Team', 'DEF'];
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
    if (status.detailedState === 'Final') {
      return `${home.score} - ${away.score}`;
    } else {
      return moment(gameDate).format('HH:mm');
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
    // TODO: Make this smarter by showing time remaining
    // only when period is 1-4
    if (!status.detailedState === 'Final') {
      return linescore.currentPeriodOrdinal;
    }
    // Return detailedState if game has not started
    if (linescore.currentPeriod === 0) {
      return status.detailedState;
    }
    return 'Final';
  }

  function determineLeagueScore() {
    if (status.detailedState === 'Final') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{ fontSize: '12px' }}
          >{`(${home.leagueRecord.wins}-${home.leagueRecord.losses}-${home.leagueRecord.ot})`}</div>
          <div
            style={{ fontSize: '12px' }}
          >{`(${away.leagueRecord.wins}-${away.leagueRecord.losses}-${away.leagueRecord.ot})`}</div>
        </div>
      );
    }
    return null;
  }

  return (
    <Card
      style={
        matches
          ? { width: '350px', margin: '16px 16px 0px 0px' }
          : { width: '100%', marginTop: '16px' }
      }
    >
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">
            {determineGameType(gamePk.toString())}
          </Typography>
          <Typography variant="subtitle1">{determineGameState()}</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '16px 0px 8px 0px',
            alignItems: 'center'
          }}
        >
          <div>
            <Avatar
              style={{
                width: '40px',
                overflow: 'visible',
                position: 'relative',
                marginLeft: '4px',
                backgroundColor:
                  (home.team.id === 14 || home.team.id === 10) &&
                  type === 'light'
                    ? 'lightgray'
                    : null
              }}
              imgProps={{
                style: { position: 'absolute', width: '145%' }
              }}
              src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${home.team.id}.svg`}
              alt="Team"
              onError={e => {
                e.target.onerror = null;
                e.target.src = defLogo;
              }}
            />
          </div>
          <Typography
            variant="h5"
            style={
              status.detailedState === 'Final'
                ? {
                    letterSpacing: '15px',
                    marginRight: '-15px'
                  }
                : null
            }
          >
            {determineScore()}
          </Typography>
          <div>
            <Avatar
              style={{
                width: '40px',
                position: 'relative',
                marginRight: '4px',
                overflow: 'visible',
                backgroundColor:
                  (away.team.id === 14 || away.team.id === 10) &&
                  type === 'light'
                    ? 'lightgray'
                    : null
              }}
              imgProps={{
                style: { position: 'absolute', width: '145%' }
              }}
              src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${away.team.id}.svg`}
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
        {status.detailedState === 'Final' && (
          <>
            <Divider style={{ margin: '12px 0px' }} />
            <GameOverviewTable
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
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(mapStateToProps)(ScheduleDayItem);
