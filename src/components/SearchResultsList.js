import React from "react";
import { searchPlayers } from "../functions/searchPlayer";
import { parseSearchResult } from "../functions/parseSearchResult";

const SearchResultsList = ({ term }) => {
  // Needs to be parsed for better usability
  const arrayOfPlayers = searchPlayers(term);
  // Returns array of player statistics
  const parsedPlayerIds = parseSearchResult(arrayOfPlayers);
  console.log(parsedPlayerIds);

  const handleOnClick = player => {
    console.log("you clicked", player[0]);
  };

  const renderPlayerList = parsedPlayerIds.map(player => (
    <div key={player[0]} onClick={() => handleOnClick(player)}>
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
          <span className="mdc-list-item__secondary-text">
            Second-line text
          </span>
        </span>
      </li>
      <hr className="mdc-list-divider" />
    </div>
  ));

  return (
    <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list">
      {renderPlayerList}
    </ul>
  );
};

export default SearchResultsList;
