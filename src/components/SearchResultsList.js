import React from 'react';
import {searchPlayers} from "../functions/searchPlayer";
import {parseSearchResult} from "../functions/parseSearchResult";

const SearchResultsList = ({term}) => {
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Returns array of player statistics
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);

  const renderPlayerList = () => {
    return parsedPlayerIds.map(player => <li key={player[0]}>{`${player[2]} ${player[1]}`}</li>);
  };

  return (
    <ul>
      {renderPlayerList()}
    </ul>
  );
};

export default SearchResultsList;
