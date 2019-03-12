import { useState, useEffect } from 'react';
import axios from 'axios';

// TODO: Implement getplayers
export const getPlayerInfo = playerId => {
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    (async (ids) => {
      if (ids !== 0) {
        const response = await axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${ids}`
        );
        setPlayerStats(response.data);
      }
    })(playerId);
  }, [playerId]);

  return playerStats;
};
