import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

import { seasonTableStyles } from "../styles/jss-styles";

const CareerTable = props => {
  const {
    classes, width,
    player: {
      stats: {
        0: {
          splits
        }
      }
    }
  } = props;

  let id = 0;
  const createData = (name, season, games, points, goals, assists) => {
    id += 1;
    return { id, name, season, games, points, goals, assists };
  };

  let rows = [];

  splits.forEach(season => {
    let a = {};
    let seasonWithDash = season.season.slice(0,4) + "-" + season.season.slice(4);
    a = createData(season.league.name, seasonWithDash, season.stat.games, season.stat.points, season.stat.goals, season.stat.assists);
    rows.push(a);
  });

  const replacer = season => {
    let newSeason = season.replace(/^\d{2}|-\d{2}/g, '')
    newSeason = newSeason.slice(0,2) + "-" + newSeason.slice(2);
    return newSeason;
  }

  return (
    <div className={classes.root}>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Career
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">League</TableCell>
            <TableCell align="center">Season</TableCell>
            <TableCell align="center">GP</TableCell>
            <TableCell align="center">P</TableCell>
            <TableCell align="center">G</TableCell>
            <TableCell align="center">A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="center" className={classes.rowItem}>
                {row.name}
              </TableCell>
              <TableCell align="center" className={classes.rowItem}>
                {isWidthDown('sm', width) ? replacer(row.season) : row.season}
              </TableCell>
              <TableCell align="center" className={classes.rowItem}>
                {row.games}
              </TableCell>
              <TableCell align="center" className={classes.rowItem}>
                {row.points}
              </TableCell>
              <TableCell align="center" className={classes.rowItem}>
                {row.goals}
              </TableCell>
              <TableCell align="center" className={classes.rowItem}>
                {row.assists}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default withWidth()(withStyles(seasonTableStyles)(CareerTable));
