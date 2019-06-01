import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGetPlayerInfo = (playerId, modifier) => {
  const [playerStats, setPlayerStats] = useState([]);
  let modURL = modifier ? modifier : '';
  useEffect(() => {
    (async (ids) => {
      if (ids !== 0) {
        const { data } = await axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${ids}/${modURL}`
        );
        setPlayerStats(data);
      }
    })(playerId);
  }, [playerId, modURL]);

  return playerStats;
};
