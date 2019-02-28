import React from "react";
import { searchPlayers } from "../functions/searchPlayer";
import { parseSearchResult } from "../functions/parseSearchResult";

const SearchResultsList = ({ term }) => {
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Returns array of player statistics
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);
  console.log(parsedPlayerIds);

  const renderPlayerList = parsedPlayerIds.map(player => (
    <div>
      {/*
      https://nhl.bamcontent.com/images/headshots/current/168x168/${playerID}.jpg
    */}
      <li className="mdc-list-item" tabIndex="0" key={player[0]}>
        <span className="mdc-list-item__text">
          <span className="mdc-list-item__primary-text">{`${player[2]} ${player[1]}`}</span>
          <span className="mdc-list-item__secondary-text">Second-line text</span>
        </span>
      </li>
      <hr className="mdc-list-divider"/>
    </div>
  ));

  return <ul className="mdc-list mdc-list--two-line">{renderPlayerList}</ul>;
};

export default SearchResultsList;
