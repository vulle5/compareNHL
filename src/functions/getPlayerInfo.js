import { useState, useEffect } from 'react';
import axios from 'axios';

export const getPlayerInfo = (playerId, modifier) => {
  const [playerStats, setPlayerStats] = useState([]);
  let modURL = modifier ? modifier : ''; 
  console.log(modURL);
  useEffect(() => {
    (async (ids) => {
      if (ids !== 0) {
        const response = await axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${ids}/${modURL}`
        );
        setPlayerStats(response.data);
      }
    })(playerId);
  }, [playerId]);

  return playerStats;
};
