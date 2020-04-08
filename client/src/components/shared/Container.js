import React from 'react';

import { useContainerStyles } from '../../styles/useStyles';

const Container = ({ children }) => {
  const classes = useContainerStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

export default Container;
