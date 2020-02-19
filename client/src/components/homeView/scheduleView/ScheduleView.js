import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import moment from 'moment';
import 'moment-timezone';

import { ReactComponent as CardLogo } from '../../../assets/cardViewButton.svg';
import { ReactComponent as ListLogo } from '../../../assets/listViewButton.svg';
import ScheduleList from './ScheduleList';
import { useScheduleViewStyles } from '../../../styles/useStyles';
import { Tooltip, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import useEventSource from '../../../functions/useEventSource';

const ScheduleView = () => {
  const [dates, setDates] = useState([]);
  const [datePicker, setDatePicker] = useState(moment());
  const [viewStyle, setViewStyle] = useState('card');
  const { viewLogo, ...classes } = useScheduleViewStyles();
  const theme = useTheme();
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
  const event = useEventSource(
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
    checkViewStyle();
    setDatePicker(moment(date));
    if (event) {
      const data = JSON.parse(event.data)
      setDates(data.dates);
    }
  }, [date, location, event]);

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

  function handleViewStyleCard() {
    if (viewStyle !== 'list') {
      return theme.palette.type === 'light' ? 'black' : 'white';
    }
    return 'rgb(142,142,142)';
  }

  function handleViewStyleList() {
    if (viewStyle !== 'card') {
      return theme.palette.type === 'light' ? 'black' : 'white';
    }
    return 'rgb(142,142,142)';
  }

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

  if (!event) {
    return <div>...Loading</div>;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
      >
        <Typography style={{ marginRight: '16px' }}>View</Typography>
        <Tooltip title="Card" placement="top" classes={classes}>
          <CardLogo
            height="35"
            width="35"
            fill={handleViewStyleCard()}
            className={viewLogo}
            onClick={() => {
              setViewStyle('card');
              localStorage.setItem('scheduleViewStyle', 'card');
            }}
          />
        </Tooltip>
        <Tooltip title="List" placement="top" classes={classes}>
          <ListLogo
            height="35"
            width="35"
            className={viewLogo}
            fill={handleViewStyleList()}
            onClick={() => {
              setViewStyle('list');
              localStorage.setItem('scheduleViewStyle', 'list');
            }}
          />
        </Tooltip>
      </div>
      {dates.map(({ date, games }, index) => (
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

export default ScheduleView;
