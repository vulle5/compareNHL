import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemSecondaryAction,
  Button
} from '@material-ui/core';
import history from '../../history';

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
          <Avatar
            alt="Player logo"
            src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player[0]}.jpg`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg';
            }}
          />
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
