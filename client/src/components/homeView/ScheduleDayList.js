import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import ScheduleDayItem from './ScheduleDayItem';
import scheduleServices from '../../services/schedule';

const ScheduleDayList = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    (async () => {
      const { dates } = await scheduleServices.getGamesBetween(
        '2019-09-23',
        '2019-09-25'
      );
      setDates(dates);
      console.log(dates);
    })();
  }, []);

  if (!dates.length) {
    return <div>...Loading</div>;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      {dates.map(({ date, games }) => (
        <div key={date}>
          <Typography variant="h4">Title</Typography>
          <div
            style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}
          >
            {games.map(({ teams: teamsPlaying, gamePk }) => (
              <ScheduleDayItem
                key={gamePk}
                home={teamsPlaying.home}
                away={teamsPlaying.away}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleDayList;
