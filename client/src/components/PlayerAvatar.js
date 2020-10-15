import React from 'react';
import { Avatar } from '@material-ui/core';

const PlayerAvatar = ({ playerId, styles, className }) => {
  return (
    <Avatar
      alt="Player logo"
      className={className}
      style={styles}
      src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          'https://cms.nhl.bamgrid.com/images/headshots/current/168x168/skater.jpg';
      }}
    />
  );
};

PlayerAvatar.defaultProps = {
  styles: {}
};

export default PlayerAvatar;
