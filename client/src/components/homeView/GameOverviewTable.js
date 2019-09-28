import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core';
import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { get } from 'lodash';

const GameOverviewTable = ({
  homeAbb,
  awayAbb,
  first,
  second,
  third,
  overtime,
  shootout
}) => {
  const matches = useMediaQuery(
    json2mq({
      minWidth: 400
    })
  );

  function createData(
    team = 'DEF',
    first = '-',
    second = '-',
    third = '-',
    overtime = null,
    shootout = null
  ) {
    return { team, first, second, third, overtime, shootout };
  }

  const rows = [
    createData(
      homeAbb,
      get(first, 'home.goals', undefined),
      get(second, 'home.goals', undefined),
      get(third, 'home.goals', undefined),
      get(overtime, 'home.goals', undefined),
      get(shootout, 'home.scores', undefined)
    ),
    createData(
      awayAbb,
      get(first, 'away.goals', undefined),
      get(second, 'away.goals', undefined),
      get(third, 'away.goals', undefined),
      get(overtime, 'away.goals', undefined),
      get(shootout, 'away.scores', undefined)
    )
  ];

  return (
    <div style={!matches ? { overflowX: 'scroll' } : { overflowX: 'hidden' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            {overtime && <TableCell>OT</TableCell>}
            {shootout.startTime && <TableCell>SO</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.team}
              </TableCell>
              <TableCell>{row.first}</TableCell>
              <TableCell>{row.second}</TableCell>
              <TableCell>{row.third}</TableCell>
              {overtime && <TableCell>{row.overtime}</TableCell>}
              {shootout.startTime && <TableCell>({row.shootout})</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

GameOverviewTable.defaultProps = {
  homeAbb: 'DEF',
  awayAbb: 'DEF'
};

export default GameOverviewTable;
