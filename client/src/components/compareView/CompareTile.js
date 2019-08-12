import React from 'react';

import { Paper, Typography, Avatar } from '@material-ui/core';

const CompareTile = ({ player }) => {
  return (
    <Paper style={{ display: 'inline-block', padding: '16px' }}>
      <Avatar
        alt="Player"
        src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
          player.id
        }.jpg`}
        style={{
          width: '100px',
          height: '100px',
          margin: '12px auto 12px auto',
          WebkitBoxShadow: '0px 10px 10px -8px rgba(0,0,0,1)',
          MozBoxShadow: '0px 10px 10px -8px rgba(0,0,0,1)',
          boxShadow: '0px 10px 10px -8px rgba(0,0,0,1)',
          border: 'lightgray',
          borderStyle: 'inset',
          borderWidth: '1px'
        }}
      />
      <Typography
        variant="body1"
        style={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        {player.fullName}
      </Typography>
      <ul
        style={{
          listStyleType: 'none',
          paddingInlineStart: '0px',
          display: 'flex'
        }}
      >
        <li style={{ margin: '0 8px 0 8px' }}>{`Height: ${player.height}`}</li>
        <li style={{ margin: '0 8px 0 8px' }}>{`Weight: ${
          player.metricWeight
        }`}</li>
        <li style={{ margin: '0 8px 0 8px' }}>{`Age: ${player.currentAge}`}</li>
      </ul>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Career
      </Typography>
      <ul
        style={{
          listStyleType: 'none',
          paddingInlineStart: '0px',
          display: 'flex'
        }}
      >
        <li style={{ margin: '0 8px 0 8px' }}>{`Height: ${player.height}`}</li>
        <li style={{ margin: '0 8px 0 8px' }}>{`Weight: ${
          player.metricWeight
        }`}</li>
        <li style={{ margin: '0 8px 0 8px' }}>{`Age: ${player.currentAge}`}</li>
      </ul>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        2018-2019
      </Typography>
      <ul
        style={{
          listStyleType: 'none',
          paddingInlineStart: '0px',
          display: 'flex'
        }}
      >
        <li style={{ margin: '0 8px 0 8px' }}>{`Height: ${player.height}`}</li>
        <li style={{ margin: '0 8px 0 8px' }}>{`Weight: ${
          player.metricWeight
        }`}</li>
        <li style={{ margin: '0 8px 0 8px' }}>{`Age: ${player.currentAge}`}</li>
      </ul>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Advanced
      </Typography>
      <ul
        style={{
          listStyleType: 'none',
          paddingInlineStart: '0px',
          display: 'flex'
        }}
      >
        <li style={{ margin: '0 8px 0 8px' }}>{`Height: ${player.height}`}</li>
        <li style={{ margin: '0 8px 0 8px' }}>{`Weight: ${
          player.metricWeight
        }`}</li>
        <li style={{ margin: '0 8px 0 8px' }}>{`Age: ${player.currentAge}`}</li>
      </ul>
    </Paper>
  );
};


export default CompareTile;
