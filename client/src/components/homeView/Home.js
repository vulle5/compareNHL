import React from 'react';

import ScheduleView from './scheduleView/ScheduleView';
import TeamList from './TeamList';
import { useHomeStyles } from '../../styles/useStyles';
import TestSSE from './TestSSE';

const Home = () => {
  const classes = useHomeStyles();

  return (
    <div className={classes.root}>
      <TeamList />
      <TestSSE />
      <ScheduleView />
    </div>
  );
};

export default Home;
