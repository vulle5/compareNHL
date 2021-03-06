import React from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItemText,
  ListItem,
  Typography,
  Paper,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  Button,
  IconButton
} from '@material-ui/core';
import CompareArrows from '@material-ui/icons/CompareArrows';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useTeamStyles } from '../../styles/useStyles';
import history from '../../history';
import PlayerAvatar from '../PlayerAvatar';

const TeamRosterPosList = ({ players, title }) => {
  const classes = useTeamStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  function onCompareClick(event, id) {
    event.preventDefault();
    history.push({ pathname: `/compare/${id}` });
  }

  function ListItemLink(props) {
    return (
      <Link to={props.to}>
        <ListItem button {...props} />
      </Link>
    );
  }

  function compareButton(player) {
    return matches ? (
      <Button
        variant="contained"
        color="secondary"
        onClick={event => onCompareClick(event, player.person.id)}
      >
        compare
      </Button>
    ) : (
      <IconButton
        style={{ padding: '12px 0px 12px 12px' }}
        onClick={event => onCompareClick(event, player.person.id)}
      >
        <CompareArrows />
      </IconButton>
    );
  }

  return (
    <div className={classes.rosterList}>
      <Typography variant="h6" className={classes.rosterPosTitle}>
        {title}
      </Typography>
      <Paper className={classes.paper}>
        <List>
          {players.map(player => (
            <div key={player.person.id}>
              <ListItemLink to={`/player/${player.person.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    <PlayerAvatar playerId={player.person.id} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{`${
                  player.jerseyNumber ? `#${player.jerseyNumber}` : ''
                } ${player.person.fullName}`}</ListItemText>
                <ListItemSecondaryAction>
                  {compareButton(player)}
                </ListItemSecondaryAction>
              </ListItemLink>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default TeamRosterPosList;
