import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment-timezone';

import ScheduleDayItem from './ScheduleDayItem';
import scheduleServices from '../../services/schedule';

const ScheduleDayList = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    (async () => {
      const { dates } = await scheduleServices.getGamesBetween(
        moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD'),
        moment()
          .add(1, 'days')
          .format('YYYY-MM-DD'),
        moment.tz.guess(),
        'expand=schedule.linescore'
      );
      setDates(dates);
      console.log(dates);
    })();
  }, []);

  function getTitle(date) {
    const calendarDate = moment(date, 'YYYY-MM-DD').calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
    return calendarDate;
  }

  if (!dates.length) {
    return <div>...Loading</div>;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      {dates.map(({ date, games }) => (
        <div key={date}>
          <div style={{ display: 'flex' }}>
            <Typography variant="h4">{getTitle(date)}</Typography>
            <div style={{ alignSelf: 'center', marginLeft: '16px' }}>
              ({`GMT${moment(date).format('Z')}`})
            </div>
          </div>
          <div
            style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}
          >
            {games.map(
              ({
                teams: teamsPlaying,
                gamePk,
                status,
                gameDate,
                linescore
              }) => (
                <ScheduleDayItem
                  key={gamePk}
                  gamePk={gamePk}
                  gameDate={gameDate}
                  home={teamsPlaying.home}
                  away={teamsPlaying.away}
                  linescore={linescore}
                  status={status}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleDayList;
