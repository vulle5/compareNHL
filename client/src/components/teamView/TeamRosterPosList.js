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
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useTeamListStyles } from '../../styles/useStyles';
import history from '../../history';

const TeamRosterPosList = ({ players, title }) => {
  const classes = useTeamListStyles();
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
                    <Avatar
                      alt="Player logo"
                      src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg';
                      }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{`#${player.jerseyNumber} ${player.person.fullName}`}</ListItemText>
                <ListItemSecondaryAction>
                  {matches ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={event => onCompareClick(event, player.person.id)}
                    >
                      compare
                    </Button>
                  ) : (
                    <IconButton
                      onClick={event => onCompareClick(event, player.person.id)}
                    >
                      <SwapHoriz />
                    </IconButton>
                  )}
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
