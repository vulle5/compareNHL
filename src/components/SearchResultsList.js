import React from 'react';
import {searchPlayers} from "../functions/searchPlayer";
import {parseSearchResult} from "../functions/parseSearchResult";

const SearchResultsList = ({term}) => {
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Here is the parsed array
  const parsedPlayers = parseSearchResult(arrayOfPlayers);

  let playerList = parsedPlayers.map(player => <li key={player}>{player}</li>);

  return (
    <ul>
      {
        parsedPlayers === [] || undefined
          ? <li>...Loading</li>
          : playerList
      }
    </ul>
  );
};

export default SearchResultsList;
