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
import { useRosterTableStyles } from '../../styles/useStyles';

const RosterTable = ({ players, tableTitle, isGoalie }) => {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const classes = useRosterTableStyles();

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

  function generateTableBody(playerId, isGoalie) {
    const player = players.find(player => player.person.id === playerId);
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

    if (isGoalie) {
      const {
        stats: { goalieStats }
      } = player;
      return (
        <TableBody key={player.person.id}>
          <TableRow>
            <TableCell style={{ width: '45px' }}>
              <Link to={`/player/${player.person.id}`}>{getAvatar()}</Link>
            </TableCell>
            <TableCell align="left">
              {
                <Link
                  to={`/player/${player.person.id}`}
                  className={classes.primaryText}
                >{`#${player.jerseyNumber} ${player.person.fullName}`}</Link>
              }
            </TableCell>
            <TableCell align="right">{goalieStats.shots}</TableCell>
            <TableCell align="right">{goalieStats.saves}</TableCell>
            <TableCell align="right">
              {parseFloat(goalieStats.savePercentage || 0).toFixed(1)}
            </TableCell>
            <TableCell align="right">
              {goalieStats.powerPlayShotsAgainst}
            </TableCell>
            <TableCell align="right">
              {parseFloat(goalieStats.powerPlaySavePercentage || 0).toFixed(1)}
            </TableCell>
          </TableRow>
        </TableBody>
      );
    } else {
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
              <TableCell align="left">
                {
                  <Link
                    to={`/player/${player.person.id}`}
                    className={classes.primaryText}
                  >{`#${player.jerseyNumber} ${player.person.fullName}`}</Link>
                }
              </TableCell>
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
  }

  return (
    <div>
      <Typography
        variant="h5"
        style={{ paddingLeft: '8px', marginBottom: '8px' }}
      >
        {tableTitle}
      </Typography>
      <Table size="small" style={{ marginBottom: '24px' }}>
        {generateTableHead(isGoalie)}
        {players.map(player => generateTableBody(player.person.id, isGoalie))}
      </Table>
    </div>
  );
};

export default RosterTable;
