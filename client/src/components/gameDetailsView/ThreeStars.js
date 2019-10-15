import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';

const ThreeStars = () => {
  return (
    <div style={{ display: 'inline-block' }}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Three Stars
      </Typography>
      <List style={{ maxWidth: '350px' }} dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText style={{ marginRight: '50px' }}>
            Tuukka Rask
          </ListItemText>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">S</TableCell>
                <TableCell align="center">S%</TableCell>
                <TableCell align="center">GAA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">17:35</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText style={{ marginRight: '50px' }}>
            Aleksander Barkov
          </ListItemText>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">G</TableCell>
                <TableCell align="center">A</TableCell>
                <TableCell align="center">TOI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">17:35</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText style={{ marginRight: '50px' }}>
            Jakob Forsbacka Karlsson
          </ListItemText>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">G</TableCell>
                <TableCell align="center">A</TableCell>
                <TableCell align="center">TOI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">17:35</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ListItem>
      </List>
    </div>
  );
};

export default ThreeStars;
