import React, { Fragment } from "react";
import typy from 'typy';
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
  const { classes, width, player }= props;

  const renderContent = () => {
    if(typy(props, 'player.stats[1].splits[0].stat').safeObject) {
      const {
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

      return (
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
              <TableCell align="center" className={classes.rowItem}>{allTime.games || "0"}</TableCell>
              <TableCell align="center" className={classes.rowItem}>{allTime.points || "0"}</TableCell>
              <TableCell align="center" className={classes.rowItem}>{allTime.goals || "0"}</TableCell>
              <TableCell align="center" className={classes.rowItem}>{allTime.assists || "0"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    } else {
      return <Typography variant="body1" style={{padding: "8px"}}>{player.fullName} does not have any NHL stats</Typography>
    }
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography style={{paddingTop: '20px'}} variant="h6" id="tableTitle">
          NHL Career
        </Typography>
        {renderContent()}
      </div>
      {isWidthUp('sm', width) ? <SeasonTabs player={player}/> : null}
    </Fragment>
  );
};

export default withWidth()(withStyles(seasonTableStyles)(SeasonTable));
