import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery
} from '@material-ui/core';

const RosterTeamList = ({ players, teamName, forwards, defense, goalies }) => {
  const allPlayers = [...Object.keys(players).map(i => players[i])];
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  function generateTableHead(isGoalie) {
    if (isGoalie) {
      return (
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">{matches ? 'Shots' : 'SA'}</TableCell>
            <TableCell align="right">{matches ? 'Saves' : 'S'}</TableCell>
            <TableCell align="right">{matches ? 'Save%' : 'S%'}</TableCell>
            <TableCell align="right">{matches ? 'PPshots' : 'PPSA'}</TableCell>
            <TableCell align="right">{matches ? 'PPsave%' : 'PP%'}</TableCell>
          </TableRow>
        </TableHead>
      );
    }
    return (
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="left">Name</TableCell>
          <TableCell align="right">{matches ? 'Points' : 'P'}</TableCell>
          <TableCell align="right">{matches ? 'Goals' : 'G'}</TableCell>
          <TableCell align="right">{matches ? 'Assists' : 'A'}</TableCell>
          <TableCell align="right">{matches ? 'Shots' : 'S'}</TableCell>
          <TableCell align="right">TOI</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  function generateTableBody(playerId) {
    const player = allPlayers.find(player => player.person.id === playerId);
    const getAvatar = () => (
      <Avatar
        alt="Player logo"
        style={{ height: '45px', width: '45px' }}
        src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
        onError={e => {
          e.target.onerror = null;
          e.target.src =
            'https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg';
        }}
      />
    );

    if (player.position.abbreviation === 'G') {
      const {
        stats: { goalieStats }
      } = player;
      return (
        <TableBody key={player.person.id}>
          <TableRow>
            <TableCell style={{ width: '45px' }}>
              <Link to={`/player/${player.person.id}`}>{getAvatar()}</Link>
            </TableCell>
            <TableCell align="left">{`#${player.jerseyNumber} ${player.person.fullName}`}</TableCell>
            <TableCell align="right">{goalieStats.shots}</TableCell>
            <TableCell align="right">{goalieStats.saves}</TableCell>
            <TableCell align="right">
              {goalieStats.savePercentage.toFixed(1)}
            </TableCell>
            <TableCell align="right">
              {goalieStats.powerPlayShotsAgainst}
            </TableCell>
            <TableCell align="right">
              {goalieStats.powerPlaySavePercentage.toFixed(1)}
            </TableCell>
          </TableRow>
        </TableBody>
      );
    } else {
    }
    try {
      const {
        stats: { skaterStats }
      } = player;
      return (
        <TableBody key={player.person.id}>
          <TableRow>
            <TableCell style={{ width: '45px' }}>
              <Link to={`/player/${player.person.id}`}>{getAvatar()}</Link>
            </TableCell>
            <TableCell align="left">{`#${player.jerseyNumber} ${player.person.fullName}`}</TableCell>
            <TableCell align="right">
              {skaterStats.goals + skaterStats.assists}
            </TableCell>
            <TableCell align="right">{skaterStats.goals}</TableCell>
            <TableCell align="right">{skaterStats.assists}</TableCell>
            <TableCell align="right">{skaterStats.shots}</TableCell>
            <TableCell align="right">{skaterStats.timeOnIce}</TableCell>
          </TableRow>
        </TableBody>
      );
    } catch (error) {
      return null;
    }
  }

  return (
    <div>
      <Typography
        variant="h4"
        style={{ textAlign: 'center', marginBottom: '24px' }}
      >
        {teamName}
      </Typography>
      <Typography
        variant="h5"
        style={{ paddingLeft: '8px', marginBottom: '8px' }}
      >
        Forwards
      </Typography>
      <Table size="small" style={{ marginBottom: '24px' }}>
        {generateTableHead()}
        {forwards.map(player => generateTableBody(player.person.id))}
      </Table>
      <Typography
        variant="h5"
        style={{ paddingLeft: '8px', marginBottom: '8px' }}
      >
        Defense
      </Typography>
      <Table size="small" style={{ marginBottom: '24px' }}>
        {generateTableHead()}
        {defense.map(player => generateTableBody(player.person.id))}
      </Table>
      <Typography
        variant="h5"
        style={{ paddingLeft: '8px', marginBottom: '8px' }}
      >
        Goalies
      </Typography>
      <Table size="small">
        {generateTableHead(true)}
        {goalies.map(player => generateTableBody(player.person.id))}
      </Table>
    </div>
  );
};

export default RosterTeamList;
