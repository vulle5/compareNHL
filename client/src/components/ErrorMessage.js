import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';

import image from '../assets/notFound.png';

const ErrorMessage = () => {
  const matches = useMediaQuery(theme => theme.breakpoints.up('xs'));
  return (
    <div
      style={{
        margin: '16px',
        paddingTop: matches ? '64px' : '56px',
        textAlign: 'center'
      }}
    >
      <img style={{ width: '100%', height: 'auto' }} src={image} alt="Error" />
      <Typography style={{ padding: '16px', textAlign: 'center' }} variant="h5">
        There is nothing to see here.
      </Typography>
      <Typography style={{ padding: '16px', textAlign: 'center' }} variant="h5">
        Search players from search bar at upper right corner or click CompareNHL
        at upper left corner to go back Home.
      </Typography>
    </div>
  );
};

export default ErrorMessage;
