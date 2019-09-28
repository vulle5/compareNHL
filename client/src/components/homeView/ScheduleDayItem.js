import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import json2mq from 'json2mq';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  CardActions,
  IconButton,
  Collapse
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import defLogo from '../../assets/defLogo.svg';
import teamServices from '../../services/teams';
import { useScheduleDayItemStyles } from '../../styles/useStyles';
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
  const [expanded, setExpanded] = useState(false);

  const {
    palette: { type }
  } = useTheme();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 768
    })
  );
  const classes = useScheduleDayItemStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const findTeamName = useCallback(
    async teamToSearch => {
      if (teams.length) {
        try {
          const { teamName } = teams.find(
            team => team.id === teamToSearch.team.id
          );
          return teamName;
        } catch (error) {
          const {
            teams: {
              0: { teamName }
            }
          } = await teamServices.getTeam(teamToSearch.team.id, '');
          return teamName;
        }
      }
    },
    [teams]
  );

  useEffect(() => {
    (async () => {
      const homeTeam = await findTeamName(home);
      const abbTeam = await findTeamName(away);
      setHomeAbb(homeTeam);
      setAwayAbb(abbTeam);
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
          <Typography variant="h5">{determineScore()}</Typography>
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
            {`@${homeAbb}`}
          </Typography>
          <Typography style={{ textAlign: 'center' }} variant="subtitle1">
            {awayAbb}
          </Typography>
        </div>
        {determineLeagueScore()}
        {status.detailedState === 'Final' && (
          <>
            <CardActions disableSpacing>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <GameOverviewTable />
            </Collapse>
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
