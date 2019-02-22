import React from 'react';
import {searchPlayers} from "../functions/searchPlayer";

const SearchResultsList = ({term}) => {
  const arrayOfPlayers = searchPlayers(term);
  let playerList = arrayOfPlayers.map(player => <li key={player}>{player}</li>);

  return (
    <ul>
      {
        arrayOfPlayers === [] || undefined
          ? <li>...Loading</li>
          : playerList
      }
    </ul>
  );
};

export default SearchResultsList;
