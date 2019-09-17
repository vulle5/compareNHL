import React from 'react';

import { LinearProgress } from '@material-ui/core';

const LinearProgressBar = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', paddingTop: '64px' }}>
      <LinearProgress
        color="secondary"
        style={{ height: '2px' }}
      />
    </div>
  );
};

export default LinearProgressBar;
