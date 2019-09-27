import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core';

const GameOverviewTable = () => {
  function createData(team, first, second, third, overtime, shootout) {
    return { team, first, second, third, overtime, shootout };
  }

  const rows = [
    createData('DET', 0, 1, 1, 0, 4),
    createData('FLA', 1, 1, 0, 0, 3)
  ];

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>OT</TableCell>
            <TableCell>SO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.team}>
              <TableCell component="th" scope="row">
                {row.team}
              </TableCell>
              <TableCell>{row.first}</TableCell>
              <TableCell>{row.second}</TableCell>
              <TableCell>{row.third}</TableCell>
              <TableCell>{row.overtime}</TableCell>
              <TableCell>({row.shootout})</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GameOverviewTable;
