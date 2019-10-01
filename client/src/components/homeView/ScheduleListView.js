import React from 'react';
import { Typography, Card } from '@material-ui/core';
import moment from 'moment';

import { useScheduleCardViewStyles } from '../../styles/useStyles';
import DatePicker from './DatePicker';

const ScheduleListView = ({
  getTitle,
  datePicker,
  handleDateChange,
  date,
  games,
  index
}) => {
  const classes = useScheduleCardViewStyles();

  const generateDateCardView = (date, games, index) => {
    if (games.length) {
      return (
        <div>
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
                <div key={gamePk}>Make new component here!</div>
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

  return <>{generateDateCardView(date, games, index)}</>;
};

export default ScheduleListView;
