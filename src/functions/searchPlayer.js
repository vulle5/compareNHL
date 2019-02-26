import { useState, useEffect } from 'react';
import axios from 'axios';

export const searchPlayers = searchTerm => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    (async (searchTerm) => {
      if (searchTerm !== "") {
        const response = await axios.get(
          `https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${searchTerm}/99999`
        );
        // API returns a object with key of "suggestions" that is a an array
        setPlayers(response.data.suggestions);
      }
    })(searchTerm);
  }, [searchTerm]);

  return players;
};
