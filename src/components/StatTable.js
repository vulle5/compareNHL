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

// This does not work properly
const generateTableBody = (bodyCells, tableCells, classes, key) => {
  const newArray = tableCells.map(object => {
    return Object.values(object);
  });
  console.log(newArray);
  return bodyCells.map(cell => (
    <TableRow key={key || cell.id}>
      {newArray.map(cell => (
        <TableCell align="center" className={classes.rowItem}>
          {cell}
        </TableCell>
      ))}
    </TableRow>
  ));
};

const StatTable = ({ classes, headCells, bodyCells, tableCells, key }) => {
  console.log(bodyCells);
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
