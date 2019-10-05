import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import moment from 'moment';
import 'moment-timezone';

import { ReactComponent as CardLogo } from '../../../assets/cardViewButton.svg';
import { ReactComponent as ListLogo } from '../../../assets/listViewButton.svg';
import scheduleServices from '../../../services/schedule';
import { toggleProgress } from '../../../reducers/globalProgressReducer';
import ScheduleList from './ScheduleList';
import { useScheduleViewStyles } from '../../../styles/useStyles';
import { Tooltip } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

const ScheduleView = ({ toggleProgress }) => {
  const yesterday = moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const tomorrow = moment()
    .add(1, 'days')
    .format('YYYY-MM-DD');

  const [dates, setDates] = useState([]);
  const [datePicker, setDatePicker] = useState(moment());
  const [viewStyle, setViewStyle] = useState('card');
  const { viewLogo, ...classes } = useScheduleViewStyles();
  const theme = useTheme();
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

  const checkViewStyle = () => {
    const viewType = localStorage.getItem('scheduleViewStyle');
    if (viewType) {
      setViewStyle(viewType);
    }
  };

  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      toggleProgress(true);
      checkViewStyle();
      const {
        location: { search }
      } = history;
      const { date } = qs.parse(search.substring(1));
      if (!date || moment(date, 'YYYY-MM-DD').isValid()) {
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
      }
      toggleProgress(false);
    })();
  }, [getDates, tomorrow, yesterday, location, history, toggleProgress]);

  const handleDateChange = date => {
    if (moment(date).isValid()) {
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

  if (!dates.length) {
    return <div>...Loading</div>;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '16px' }}>View</div>
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

export default connect(
  null,
  { toggleProgress }
)(ScheduleView);
