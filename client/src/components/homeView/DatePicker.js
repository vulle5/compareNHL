import React from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const DatePicker = ({ date, handleDateChange }) => {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          disableToolbar={!matches}
          margin="normal"
          variant={!matches ? 'dialog' : 'inline'}
          id="date-picker"
          label="Select date"
          format="YYYY/MM/DD"
          minDate={moment('1917-12-19')}
          maxDate={moment().add(1, 'years')}
          value={date}
          onChange={date => handleDateChange(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        ></KeyboardDatePicker>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
