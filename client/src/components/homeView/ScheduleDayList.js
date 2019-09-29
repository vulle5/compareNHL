import React, { useState, useEffect } from 'react';
import { Typography, Button, Card } from '@material-ui/core';
import moment from 'moment';
import 'moment-timezone';

import ScheduleDayItem from './ScheduleDayItem';
import scheduleServices from '../../services/schedule';
import DatePicker from './DatePicker';

const ScheduleDayList = () => {
  const [dates, setDates] = useState([]);
  const [showYesterday, setShowYesterday] = useState(false);
  const [today, setToday] = useState(moment());
  const [yesterday, setYesterday] = useState(
    moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
  );
  const [tomorrow, setTomorrow] = useState(
    moment()
      .add(1, 'days')
      .format('YYYY-MM-DD')
  );

  useEffect(() => {
    (async () => {
      const { dates } = await scheduleServices.getGamesBetween(
        showYesterday ? today.format('YYYY-MM-DD') : yesterday,
        tomorrow,
        moment.tz.guess(),
        'expand=schedule.linescore'
      );
      setDates(dates);
      window.scrollTo(0, 0);
      console.log(dates);
    })();
  }, [showYesterday, today, tomorrow, yesterday]);

  const handleDateChange = date => {
    const yesterday = moment(date)
      .subtract(1, 'days')
      .format('YYYY-MM-DD');
    const tomorrow = moment(date)
      .add(1, 'days')
      .format('YYYY-MM-DD');
    setToday(date);
    setYesterday(yesterday);
    setTomorrow(tomorrow);
    setShowYesterday(true);
  };

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

  const generateDateView = (date, games, index) => {
    if (games.length) {
      return (
        <div key={date}>
          <div
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Typography variant="h4" style={{ marginRight: '16px' }}>
              {getTitle(date)}
            </Typography>
            <div style={{ marginRight: '32px' }}>
              ({`UTC${moment(date).format('Z')}`})
            </div>
            {index === 0 && (
              <DatePicker date={today} handleDateChange={handleDateChange} />
            )}
            {showYesterday && index === 0 && (
              <Button
                color="primary"
                onClick={() => setShowYesterday(false)}
                style={{ marginLeft: 'auto', marginRight: '32px' }}
              >
                Show Yesterday
              </Button>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginBottom: '32px',
              alignItems: 'flex-start'
            }}
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
      );
    }
    return (
      <div key={date}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <Typography variant="h4" style={{ marginRight: '16px' }}>
            {getTitle(date)}
          </Typography>
          <div style={{ marginRight: '32px' }}>
            ({`UTC${moment(date).format('Z')}`})
          </div>
          {index === 0 && (
            <DatePicker date={today} handleDateChange={handleDateChange} />
          )}
        </div>
        <Card
          style={{
            marginBottom: '32px',
            display: 'inline-block',
            padding: '16px'
          }}
        >
          <Typography>No games for this day</Typography>
        </Card>
      </div>
    );
  };

  if (!dates.length) {
    return <div>...Loading</div>;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      {dates.map(({ date, games }, index) =>
        generateDateView(date, games, index)
      )}
    </div>
  );
};

export default ScheduleDayList;
