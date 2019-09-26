import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import { Typography, Card, CardContent, Avatar } from '@material-ui/core';

import defLogo from '../../assets/defLogo.svg';
import teamServices from '../../services/teams';
import moment from 'moment';

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
  const {
    palette: { type }
  } = useTheme();

  const findAbbreviation = useCallback(
    async teamToSearch => {
      if (teams.length) {
        try {
          const { abbreviation } = teams.find(
            team => team.id === teamToSearch.team.id
          );
          return abbreviation;
        } catch (error) {
          const {
            teams: {
              0: { abbreviation }
            }
          } = await teamServices.getTeam(teamToSearch.team.id, '');
          return abbreviation;
        }
      }
    },
    [teams]
  );

  useEffect(() => {
    (async () => {
      const homeTeam = await findAbbreviation(home);
      const abbTeam = await findAbbreviation(away);
      setHomeAbb(homeTeam);
      setAwayAbb(abbTeam);
    })();
  }, [away, home, findAbbreviation]);

  function determineScore() {
    if (status.detailedState === 'Final') {
      return `${home.score} - ${away.score}`;
    } else {
      return moment(gameDate).format('hh:mm');
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
    if (!status.detailedState === 'Final') {
      return linescore.currentPeriodOrdinal;
    }
    return 'Final';
  }

  return (
    <Card style={{ width: '288px', margin: '16px 16px 0px 0px' }}>
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
            height: '100px',
            marginTop: '8px',
            alignItems: 'center'
          }}
        >
          <div>
            <Avatar
              style={{
                width: '60px',
                overflow: 'visible',
                backgroundColor:
                  (home.team.id === 14 || home.team.id === 10) &&
                  type === 'light'
                    ? 'lightgray'
                    : null
              }}
              src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${home.team.id}.svg`}
              alt="Team"
              onError={e => {
                e.target.onerror = null;
                e.target.src = defLogo;
              }}
            />
            <Typography style={{ textAlign: 'center' }} variant="subtitle1">
              {`@${homeAbb}`}
            </Typography>
          </div>
          <Typography variant="h5">{determineScore()}</Typography>
          <div>
            <Avatar
              style={{
                width: '60px',
                overflow: 'visible',
                backgroundColor:
                  (away.team.id === 14 || away.team.id === 10) &&
                  type === 'light'
                    ? 'lightgray'
                    : null
              }}
              src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${away.team.id}.svg`}
              alt="Team"
              onError={e => {
                e.target.onerror = null;
                e.target.src = defLogo;
              }}
            />
            <Typography style={{ textAlign: 'center' }} variant="subtitle1">
              {awayAbb}
            </Typography>
          </div>
        </div>
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
