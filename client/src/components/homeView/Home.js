import React from 'react';

import ScheduleView from './scheduleView/ScheduleView';
import TeamList from './TeamList';
import { useHomeStyles } from '../../styles/useStyles';

const Home = () => {
  const classes = useHomeStyles();

  return (
    <div className={classes.root}>
      <TeamList />
      <ScheduleView />
    </div>
  );
};

export default Home;
