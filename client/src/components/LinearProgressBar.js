import React from 'react';
import { LinearProgress } from '@material-ui/core';

import { useLinearProgressBarStyles } from '../styles/useStyles';

const LinearProgressBar = () => {
  const classes = useLinearProgressBarStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="secondary" style={{ height: '2px' }} />
    </div>
  );
};

export default LinearProgressBar;
