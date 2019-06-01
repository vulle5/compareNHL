import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSearchPlayer = searchTerm => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    (async (searchTerm) => {
      if (searchTerm !== "") {
        const { data: {suggestions} } = await axios.get(
          `https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${searchTerm}/99999`
        );
        setPlayers(suggestions);
      }
    })(searchTerm);
  }, [searchTerm]);

  return players;
};
