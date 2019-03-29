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
import { seasonTableStyles } from "../styles/jss-styles";

const StatTable = ({ classes, title, headCells, bodyCells }) => {

  const generateTableHead = headCells => {};

  const generateTableBody = bodyCells => {};

  return (
    <div>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        {title}
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
          <TableRow key={row.id}>
            <TableCell align="center" className={classes.rowItem}>
              {row.name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(seasonTableStyles)(StatTable);
