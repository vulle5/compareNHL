import React from 'react';
import {searchPlayers} from "../functions/searchPlayer";
import {parseSearchResult} from "../functions/parseSearchResult";

const SearchResultsList = ({term}) => {
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Returns array of player statistics
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);
  console.log(parsedPlayerIds);

  const renderPlayerList = () => {
    return parsedPlayerIds.map(player =>
      <li className="mdc-list-item" key={player[0]}>
        <span className="mdc-list-item__text">{`${player[2]} ${player[1]}, ${player[8]}`}</span>
      </li>
    );
  };

  return (
    <ul className="mdc-list">
      {renderPlayerList()}
    </ul>
  );
};

export default SearchResultsList;
