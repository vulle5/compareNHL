import React from 'react';
import { Typography, Box, useMediaQuery } from '@material-ui/core';

const TabPanel = props => {
  const { children, value, index, ...other } = props;
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box style={{ padding: matches ? '0px' : '24px' }} p={3}>
        {children}
      </Box>
    </Typography>
  );
};

export default TabPanel;
