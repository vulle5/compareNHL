import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  ListItemSecondaryAction,
  Button
} from '@material-ui/core';
import history from '../../history';
import PlayerAvatar from '../PlayerAvatar';

const SearchResultListItem = ({ player, handleListStatus, noDivider }) => {
  const onCompareClick = (event, id) => {
    event.preventDefault();
    history.push({ pathname: `/compare/${id}` });
  };

  return (
    <Link
      key={player[0]}
      to={`/player/${player[0]}`}
      replace={
        /* TODO remove this prop when react-router v5.2 and/or issue #5362 is fixed */
        history.location.pathname.replace(/\/player\//, '') === player[0]
          ? true
          : false
      }
      onClick={() => {
        handleListStatus(false);
      }}
    >
      <ListItem button alignItems="flex-start">
        <ListItemAvatar>
          <PlayerAvatar playerId={player[0]}/>
        </ListItemAvatar>
        <ListItemText
          primary={`${player[2]} ${player[1]}`}
          secondary={player[10]}
        />
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="secondary"
            onClick={event => onCompareClick(event, player[0])}
          >
            compare
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      {!noDivider && <Divider />}
    </Link>
  );
};
export default SearchResultListItem;
