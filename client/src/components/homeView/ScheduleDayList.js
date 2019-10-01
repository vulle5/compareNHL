import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import moment from 'moment';
import 'moment-timezone';

import { ReactComponent as CardLogo } from '../../assets/cardViewButton.svg';
import { ReactComponent as ListLogo } from '../../assets/listViewButton.svg';
import scheduleServices from '../../services/schedule';
import { toggleProgress } from '../../reducers/globalProgressReducer';
import ScheduleCardView from './ScheduleCardView';
import ScheduleListView from './ScheduleListView';

const ScheduleDayList = ({ toggleProgress }) => {
  const yesterday = moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const tomorrow = moment()
    .add(1, 'days')
    .format('YYYY-MM-DD');

  const [dates, setDates] = useState([]);
  const [datePicker, setDatePicker] = useState(moment());
  const [viewStyle, setViewStyle] = useState('card');
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
      toggleProgress(true);
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
      toggleProgress(false);
      setDatePicker(moment(date));
      setDates(dates);
    })();
  }, [getDates, tomorrow, yesterday, location, history, toggleProgress]);

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

  if (!dates.length) {
    return <div>...Loading</div>;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '16px' }}>View</div>
        <CardLogo
          height="35"
          width="35"
          style={{ marginRight: '8px', cursor: 'pointer' }}
          onClick={() => setViewStyle('card')}
        />
        <ListLogo
          height="35"
          width="35"
          style={{ marginRight: '8px', cursor: 'pointer' }}
          onClick={() => setViewStyle('list')}
        />
      </div>
      {dates.map(({ date, games }, index) =>
        viewStyle === 'card' ? (
          <ScheduleCardView
            key={date}
            getTitle={getTitle}
            datePicker={datePicker}
            handleDateChange={handleDateChange}
            date={date}
            games={games}
            index={index}
          />
        ) : (
          <ScheduleListView
            key={date}
            getTitle={getTitle}
            datePicker={datePicker}
            handleDateChange={handleDateChange}
            date={date}
            games={games}
            index={index}
          />
        )
      )}
    </div>
  );
};

export default connect(
  null,
  { toggleProgress }
)(ScheduleDayList);
