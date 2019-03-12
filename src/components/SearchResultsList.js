import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { searchPlayers } from "../functions/searchPlayer";
import { parseSearchResult } from "../functions/parseSearchResult";

const SearchResultsList = ({ term }) => {
  // true means render the player list
  const [listStatus, setListStatus] = useState(true);
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Returns array of player statistics
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);
  
  useEffect(() => {setListStatus(true)}, [])

  const renderPlayerList = parsedPlayerIds.map(player => (
    <Link key={player[0]} to={`/player/${player[0]}`} onClick={() => {setListStatus(false)}}>
      <li className="mdc-list-item" tabIndex="0">
        <span className="mdc-list-item__graphic material-icons">
          <img
            src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
              player[0]
            }.jpg`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                "https://nhl.bamcontent.com/images/headshots/current/168x168/skater.jpg";
            }}
            alt="player"
            height="40"
            width="40"
          />
        </span>
        <span className="mdc-list-item__text">
          <span className="mdc-list-item__primary-text">
            {`${player[2]} ${player[1]}`}
          </span>
          <span className="mdc-list-item__secondary-text">{player[10]}</span>
        </span>
      </li>
      <hr className="mdc-list-divider" />
    </Link>
  ));

  return listStatus === true ? (
    <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list">
      {renderPlayerList}
    </ul>
  ) : null;
};

export default SearchResultsList;
