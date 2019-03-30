import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { seasonTableStyles } from "../styles/jss-styles";

const generateTableHead = headCells => {
  return headCells.map(cell => (
    <TableCell align="center">{cell}</TableCell>
  ));
};

const generateTableBody = (bodyCells, tableCells, classes, key) => {
  // TODO: Make unique key for each prop
  const newArray = tableCells.map(object => {
    return Object.values(object);
  });
  return bodyCells.map((cell) => (
    <TableRow key={key || cell[0]}>
      {newArray.splice(0, 1).map(cell => (
        cell.splice(1).map((oneCell, index) => (
          <TableCell align="center" key={index} className={classes.rowItem}>
            {oneCell}
          </TableCell>
        ))
      ))}
    </TableRow>
  ));
};

const StatTable = ({ classes, headCells, bodyCells, tableCells, key }) => {
  return (
    <div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {generateTableHead(headCells)}
          </TableRow>
        </TableHead>
        <TableBody>
          {generateTableBody(bodyCells, tableCells, classes, key)}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(seasonTableStyles)(StatTable);
