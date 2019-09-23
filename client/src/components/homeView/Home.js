import React from 'react';

import ScheduleDayList from './ScheduleDayList';
import TeamList from './TeamList';
import { useHomeStyles } from '../../styles/useStyles';

const Home = () => {
  const classes = useHomeStyles();

  return (
    <div className={classes.root}>
      <TeamList />
      <ScheduleDayList title="Today" />
      <ScheduleDayList title="Tomorrow" />
    </div>
  );
};

export default Home;

// https://statsapi.web.nhl.com/api/v1/seasons/20192020

// https://statsapi.web.nhl.com/api/v1/schedule
// ?startDate=2018-01-09 ?endDate=2018-01-12
// ?expand=schedule.linescore Linescore for completed games

// Current season: https://statsapi.web.nhl.com/api/v1/seasons/current
// GameID starting with... 01: preseason, 02: regular, 03: playoff, 04: allStar
