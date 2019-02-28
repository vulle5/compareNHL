import React from "react";
import { searchPlayers } from "../functions/searchPlayer";
import { parseSearchResult } from "../functions/parseSearchResult";

const SearchResultsList = ({ term }) => {
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Returns array of player statistics
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);
  console.log(parsedPlayerIds);

  const renderPlayerList = () => {
    return parsedPlayerIds.map(player => (
      <div>
        {/* 
        https://nhl.bamcontent.com/images/actionshots/${PLAYERID}
      */}
        <li className="mdc-list-item" key={player[0]}>
          <span className="mdc-list-item__text">
            {`${player[2]} ${player[1]}, ${player[8]}`}
          </span>
        </li>
        <li
          role="separator"
          className="mdc-list-divider"
          key={player[13] ? player[13] : player[12]}
        />
      </div>
    ));
  };

  return <ul className="mdc-list">{renderPlayerList()}</ul>;
};

export default SearchResultsList;
