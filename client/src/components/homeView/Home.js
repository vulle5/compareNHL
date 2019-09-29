import React from 'react';

import ScheduleDayList from './ScheduleDayList';
import TeamList from './TeamList';
import { useHomeStyles } from '../../styles/useStyles';

const Home = () => {
  const classes = useHomeStyles();

  return (
    <div className={classes.root}>
      <TeamList />
      <ScheduleDayList />
    </div>
  );
};

export default Home;
