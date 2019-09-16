import React from 'react';
import { Typography } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const TabContainer = ({ children, dir, width }) => {
  return (
    <Typography
      component="div"
      dir={dir}
      style={isWidthUp('sm', width) ? { padding: 8 * 3 } : null}
    >
      {children}
    </Typography>
  );
};

export default withWidth()(TabContainer);
