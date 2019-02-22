import React, { useState, Fragment } from 'react';

import SearchResultsList from './SearchResultsList';

const SearchPlayersBar = () => {
  const [term, setTerm] = useState('');

  let content;
  if (term.length < 3) {
    content = null;
  } else {
    content = <SearchResultsList term={term} />;
  }

  return (
    <Fragment>
      <div className="mdc-text-field mdc-text-field--fullwidth">
        <input
          className="mdc-text-field__input"
          value={term}
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
