import React from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
// Uncomment for proper local for Finland
// TODO: Need to figure out how to best get the local
// remember to add locale={'fi'}
// import 'moment/locale/fi';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDatePickerStyles } from '../../styles/useStyles';

const DatePicker = ({ date, handleDateChange }) => {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const classes = useDatePickerStyles();

  return (
    <div>
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            className={classes.root}
            disableToolbar={!matches}
            autoOk={matches}
            margin="normal"
            okLabel={matches ? '' : 'OK'}
            cancelLabel={matches ? '' : 'Cancel'}
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
    </div>
  );
};

export default DatePicker;
