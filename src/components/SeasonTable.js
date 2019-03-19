import React from 'react';

const SeasonTable = props => {
  // Get player object from props
  const { player } = props;

  return (
    <div>
      <h1>{player.stats[1].type.displayName}</h1>
    </div>
  );
}

export default SeasonTable;
