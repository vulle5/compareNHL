import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { seasonTableStyles } from '../../styles/jss-styles';

const generateTableHead = (headCells, classes) => {
  return headCells.map((cell, index) => (
    <TableCell align="center" key={index} className={classes.headItem}>
      {cell}
    </TableCell>
  ));
};

const generateTableBody = (bodyCells, tableCells, classes) => {
  const newArray = tableCells.map(object => {
    return Object.values(object);
  });
  return bodyCells.map((cell, index) => (
    <TableRow key={index}>
      {newArray.splice(0, 1).map(cell =>
        cell.splice(1).map((oneCell, index) => (
          <TableCell
            align="center"
            style={{ overflow: 'hidden', height: '60px' }}
            key={index}
          >
            {oneCell}
          </TableCell>
        ))
      )}
    </TableRow>
  ));
};

const StatTable = ({ classes, headCells, bodyCells, tableCells }) => {
  return (
    <div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{generateTableHead(headCells, classes)}</TableRow>
        </TableHead>
        <TableBody>{generateTableBody(bodyCells, tableCells)}</TableBody>
      </Table>
    </div>
  );
};

export default withStyles(seasonTableStyles)(StatTable);
