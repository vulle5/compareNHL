import React from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItemText,
  ListItem,
  Typography,
  Paper,
  Divider
} from '@material-ui/core';

import { useTeamListStyles } from '../../styles/useStyles';

const TeamRosterPosList = ({ players, title }) => {
  const classes = useTeamListStyles();

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
                <ListItemText>{`#${player.jerseyNumber} ${player.person.fullName}`}</ListItemText>
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
