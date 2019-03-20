import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import { seasonTableStyles } from '../styles/jss-styles';

const SeasonTable = props => {
  // Get player object from props
  const {
    player, classes, width,
    player: {
      stats: {
        1: {
          splits: {
            0: { stat: allTime }
          }
        }
      }
    }
  } = props;
  
  // let id = 0;
  // const createData = (games, points, goals, assists) => {
  //   id += 1;
  //   return { id, games, points, goals, assists };
  // }

  // const rows = [
    
  // ];

  // width === 'sm' || 'xs' ? 'GP' : 'Games Played'

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">{isWidthDown('sm', width) ? 'GP' : 'Games Played'}</TableCell>
            <TableCell align="center">Points</TableCell>
            <TableCell align="center">Goals</TableCell>
            <TableCell align="center">Asssists</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" className={classes.rowItem}>{allTime.games}</TableCell>
            <TableCell align="center" className={classes.rowItem}>{allTime.points}</TableCell>
            <TableCell align="center" className={classes.rowItem}>{allTime.goals}</TableCell>
            <TableCell align="center" className={classes.rowItem}>{allTime.assists}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withWidth()(withStyles(seasonTableStyles)(SeasonTable));
