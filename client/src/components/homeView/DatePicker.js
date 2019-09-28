import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker"
          label="Select date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        ></KeyboardDatePicker>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
