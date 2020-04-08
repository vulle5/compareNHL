import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import moment from 'moment';
import 'moment-timezone';

import ScheduleList from './ScheduleList';
import ToolBar from '../Toolbar';
import useEventSource from '../../../functions/useEventSource';
import { updateSchedule } from '../../../reducers/scheduleReducer';
import { toggleProgress } from '../../../reducers/globalProgressReducer';

const ScheduleView = ({ schedule, updateSchedule, toggleProgress }) => {
  const [datePicker, setDatePicker] = useState(moment());
  const [viewStyle, setViewStyle] = useState('card');
  const location = useLocation();
  const history = useHistory();
  const {
    location: { search }
  } = history;
  const { date } = qs.parse(search.substring(1));
  const startDate = date ?? moment().format('YYYY-MM-DD');
  const endDate = moment(date)
    .add(2, 'days')
    .format('YYYY-MM-DD');
  const [event, eventSource] = useEventSource(
    `/api/live?startDate=${startDate}&endDate=${endDate}&timezone=${moment.tz.guess()}&expand=schedule.linescore`,
    'liveSchedule'
  );

  const checkViewStyle = () => {
    const viewType = localStorage.getItem('scheduleViewStyle');
    if (viewType) {
      setViewStyle(viewType);
    }
  };

  useEffect(() => {
    eventSource?.readyState === 0
      ? toggleProgress(true)
      : toggleProgress(false);
    checkViewStyle();
    setDatePicker(moment(date));
    if (event) {
      const data = JSON.parse(event.data)
      updateSchedule(data.dates);
    }
  }, [date, location, event, updateSchedule, eventSource, toggleProgress]);

  const handleDateChange = date => {
    if (moment(date).isValid()) {
      window.scrollTo(0, 0);
      setDatePicker(date);
      history.push({
        pathname: history.location.pathname,
        search: `?date=${moment(date).format('YYYY-MM-DD')}`
      });
    }
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

  if (!schedule.length) {
    return <div>...Loading</div>;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <ToolBar viewStyle={viewStyle} setViewStyle={setViewStyle} />
      {schedule.map(({ date, games }, index) => (
        <ScheduleList
          key={date}
          getTitle={getTitle}
          datePicker={datePicker}
          handleDateChange={handleDateChange}
          date={date}
          games={games}
          index={index}
          viewStyle={viewStyle}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    schedule: state.schedule
  }
};

export default connect(mapStateToProps, { updateSchedule, toggleProgress })(ScheduleView);
