import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';

import { seasonTableStyles } from '../styles/jss-styles';
import SeasonTabs from "./SeasonTabs";

const SeasonTable = props => {
  // Get player object from props
  const {
    classes, width,
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
  console.log(props);
  // let id = 0;
  // const createData = (games, points, goals, assists) => {
  //   id += 1;
  //   return { id, games, points, goals, assists };
  // }

  // const rows = [
    
  // ];

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography style={{paddingTop: '20px'}} variant="h6" id="tableTitle">
          NHL Career
        </Typography>
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
      {isWidthUp('sm', width) ? <SeasonTabs /> : null }
    </Fragment>
  );
};

export default withWidth()(withStyles(seasonTableStyles)(SeasonTable));
