import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import { Typography, Card, CardContent, Avatar } from '@material-ui/core';

const ScheduleDayItem = ({ home, away, teams }) => {
  const {
    palette: { type }
  } = useTheme();

  function findTeamAbbreviation(teamToSearch) {
    if (teams.length) {
      const { abbreviation } = teams.find(
        team => team.id === teamToSearch.team.id
      );
      return abbreviation;
    }
  }

  return (
    <Card style={{ width: '288px', margin: '16px 16px 0px 0px' }}>
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100px',
          alignItems: 'center',
          padding: '16px'
        }}
      >
        <div>
          <Avatar
            style={{
              width: '60px',
              backgroundColor:
                (home.team.id === 14 || home.team.id === 10) && type === 'light'
                  ? 'lightgray'
                  : null
            }}
            src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${home.team.id}.svg`}
          />
          <Typography style={{ textAlign: 'center' }} variant="subtitle1">
            {`@${findTeamAbbreviation(home)}`}
          </Typography>
        </div>
        <Typography variant="h5">{`${home.score} - ${away.score}`}</Typography>
        <div>
          <Avatar
            style={{
              width: '60px',
              backgroundColor:
                (away.team.id === 14 || away.team.id === 10) && type === 'light'
                  ? 'lightgray'
                  : null
            }}
            src={`https://www-league.nhlstatic.com/images/logos/teams-current-circle/${away.team.id}.svg`}
          />
          <Typography style={{ textAlign: 'center' }} variant="subtitle1">
            {findTeamAbbreviation(away)}
          </Typography>
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
