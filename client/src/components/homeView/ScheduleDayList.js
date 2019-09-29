import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Card } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import moment from 'moment';
import 'moment-timezone';

import { useScheduleDayListStyles } from '../../styles/useStyles';
import ScheduleDayItem from './ScheduleDayItem';
import scheduleServices from '../../services/schedule';
import DatePicker from './DatePicker';

const ScheduleDayList = () => {
  const yesterday = moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const tomorrow = moment()
    .add(1, 'days')
    .format('YYYY-MM-DD');

  const [dates, setDates] = useState([]);
  const [datePicker, setDatePicker] = useState(moment());
  const classes = useScheduleDayListStyles();
  const location = useLocation();
  const history = useHistory();

  const getDates = useCallback(async (start, end, timezone, query) => {
    const { dates } = await scheduleServices.getGamesBetween(
      start,
      end,
      timezone,
      query
    );
    return dates;
  }, []);

  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      const {
        location: { search }
      } = history;
      const { date } = qs.parse(search.substring(1));
      const dates = await getDates(
        date ? date : yesterday,
        date
          ? moment(date)
              .add(1, 'days')
              .format('YYYY-MM-DD')
          : tomorrow,
        moment.tz.guess(),
        'expand=schedule.linescore'
      );
      setDatePicker(moment(date));
      setDates(dates);
      console.log(dates);
    })();
  }, [getDates, tomorrow, yesterday, location, history]);

  const handleDateChange = date => {
    setDatePicker(date);
    history.push({
      pathname: history.location.pathname,
      search: `?date=${moment(date).format('YYYY-MM-DD')}`
    });
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
          <div className={classes.wrapper}>
            <Typography variant="h4" style={{ marginRight: '16px' }}>
              {getTitle(date)}
            </Typography>
            <div style={{ marginRight: '32px' }}>
              ({`UTC${moment(date).format('Z')}`})
            </div>
            {index === 0 && (
              <DatePicker
                date={datePicker}
                handleDateChange={handleDateChange}
              />
            )}
          </div>
          <div className={classes.gameWrapper}>
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
        <div className={classes.emptyGameWrapper}>
          <Typography variant="h4" style={{ marginRight: '16px' }}>
            {getTitle(date)}
          </Typography>
          <div style={{ marginRight: '32px' }}>
            ({`UTC${moment(date).format('Z')}`})
          </div>
          {index === 0 && (
            <DatePicker date={datePicker} handleDateChange={handleDateChange} />
          )}
        </div>
        <Card className={classes.emptyGameCard}>
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
