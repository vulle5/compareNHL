import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import { useThreeStarsStyles } from '../../styles/useStyles';

const ThreeStars = ({
  stars: { firstStar, secondStar, thirdStar },
  stars,
  homeTeam,
  awayTeam
}) => {
  const classes = useThreeStarsStyles();

  if (!homeTeam.players || !awayTeam.players || !stars.firstStar) {
    return null;
  }

  const starPlayers = [firstStar, secondStar, thirdStar];
  const allPlayers = [
    ...Object.keys(homeTeam.players).map(i => homeTeam.players[i]),
    ...Object.keys(awayTeam.players).map(i => awayTeam.players[i])
  ];

  function generateTableHead(playerId) {
    const player = allPlayers.find(player => player.person.id === playerId);
    if (player.position.abbreviation === 'G') {
      return (
        <TableHead>
          <TableRow>
            <TableCell align="center">SA</TableCell>
            <TableCell align="center">S</TableCell>
            <TableCell align="center">S%</TableCell>
          </TableRow>
        </TableHead>
      );
    } else {
      return (
        <TableHead>
          <TableRow>
            <TableCell align="center">G</TableCell>
            <TableCell align="center">A</TableCell>
            <TableCell align="center">TOI</TableCell>
          </TableRow>
        </TableHead>
      );
    }
  }

  function generateTableBody(playerId) {
    const player = allPlayers.find(player => player.person.id === playerId);
    if (player.position.abbreviation === 'G') {
      const {
        stats: { goalieStats }
      } = player;
      return (
        <TableBody>
          <TableRow>
            <TableCell align="center">{goalieStats.shots}</TableCell>
            <TableCell align="center">{goalieStats.saves}</TableCell>
            <TableCell align="center">
              {goalieStats.savePercentage.toFixed(1)}
            </TableCell>
          </TableRow>
        </TableBody>
      );
    } else {
      const {
        stats: { skaterStats }
      } = player;
      return (
        <TableBody>
          <TableRow>
            <TableCell align="center">{skaterStats.goals}</TableCell>
            <TableCell align="center">{skaterStats.assists}</TableCell>
            <TableCell align="center">{skaterStats.timeOnIce}</TableCell>
          </TableRow>
        </TableBody>
      );
    }
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Three Stars
      </Typography>
      <List style={{ maxWidth: '320px' }} dense>
        {starPlayers.map(player => (
          <ListItem key={player.id}>
            <ListItemAvatar>
              <Link to={`/player/${player.id}`}>
                <Avatar
                  alt="Player logo"
                  style={{ height: '45px', width: '45px' }}
                  src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg';
                  }}
                />
              </Link>
            </ListItemAvatar>
            <Link to={`/player/${player.id}`}>
              <ListItemText className={classes.primaryText}>
                {player.fullName}
              </ListItemText>
            </Link>
            <div style={{ maxWidth: '320px' }}>
              <Table size="small">
                {generateTableHead(player.id)}
                {generateTableBody(player.id)}
              </Table>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    liveData: {
      decisions,
      boxscore: {
        teams: { home, away }
      }
    }
  } = state.gameDetail;
  return {
    stars: decisions,
    homeTeam: home,
    awayTeam: away
  };
};

export default connect(mapStateToProps)(ThreeStars);
