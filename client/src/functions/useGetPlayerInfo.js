import { useState, useEffect } from "react";
import axios from "axios";

export const useGetPlayerInfo = (playerId, modifier) => {
  const [playerStats, setPlayerStats] = useState([]);
  let modURL = modifier ? modifier : "";
  useEffect(() => {
    (async ids => {
      if (ids !== 0) {
        const { data } = await axios.get(`/api/players/${ids}/${modURL}`);
        setPlayerStats(data);
      }
    })(playerId);
  }, [playerId, modURL]);

  return playerStats;
};
