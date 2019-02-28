import { useState, useEffect } from 'react';
import axios from 'axios';

// TODO: Implement getplayers
export const getPlayerInfo = playerId => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    (async (ids) => {
      if (playerId.length !== 0) {
        const response = ids.map(async id => await axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${id}`
        ));
        // API returns a object with key of "suggestions" that is a an array
        setPlayers(response.data);
      }
    })(playerId);
  }, [playerId]);

  return players;
};
