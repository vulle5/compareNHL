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

const ScheduleCardItemOverview = ({
  awayAbb,
  homeAbb,
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
    team,
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
      awayAbb ?? 'AWAY',
      first?.away?.goals ?? '',
      second?.away?.goals ?? '',
      third?.away?.goals ?? '',
      overtime?.away?.goals ?? '',
      shootout?.away?.scores ?? ''
    ),
    createData(
      homeAbb ?? 'HOME',
      first?.home?.goals ?? '',
      second?.home?.goals ?? '',
      third?.home?.goals ?? '',
      overtime?.home?.goals ?? '',
      shootout?.home?.scores ?? ''
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

ScheduleCardItemOverview.defaultProps = {
  awayAbb: 'DEF',
  homeAbb: 'DEF'
};

export default ScheduleCardItemOverview;
