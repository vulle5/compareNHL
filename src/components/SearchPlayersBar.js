import React, { useState, Fragment } from "react";
import { useDebounce } from "use-debounce";

import SearchResultsList from "./SearchResultsList";

const SearchPlayersBar = () => {
  const [term, setTerm] = useState("");
  // This delays sending of the search term to API request
  const debouncedText = useDebounce(term, 300);

  let content;
  if (term.length < 3) {
    content = null;
  } else {
    content = <SearchResultsList term={debouncedText} />;
  }

  return (
    <Fragment>
      <div className="mdc-text-field">
        <input
          className="mdc-text-field__input"
          value={term}
          onFocus={(event) => event.target.select()}
          onChange={event => setTerm(event.target.value)}
          placeholder="Search Player"
          aria-label="Search Player"
        />
      </div>
      {content}
    </Fragment>
  );
};

export default SearchPlayersBar;
