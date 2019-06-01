import { useState, useEffect } from "react";
import axios from "axios";

export const useSearchPlayer = searchTerm => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    (async searchTerm => {
      if (searchTerm !== "") {
        try {
          const {
            data: { suggestions }
          } = await axios.get(
            `http://localhost:5000/api/players/search/${searchTerm}`
          );
          setPlayers(suggestions);
        } catch ({ response: { data } }) {
          setPlayers(data);
        }
      }
    })(searchTerm);
  }, [searchTerm]);

  return players;
};
