import React from 'react';
import { Typography, Card, Paper, Divider } from '@material-ui/core';
import moment from 'moment';

import { useScheduleListViewStyles } from '../../styles/useStyles';
import DatePicker from './DatePicker';

const ScheduleListView = ({
  getTitle,
  datePicker,
  handleDateChange,
  date,
  games,
  index
}) => {
  const classes = useScheduleListViewStyles();

  const generateDateListView = (date, games, index) => {
    if (games.length) {
      return (
        <div>
          <div
            style={{
              marginBottom: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
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
          <div style={{ marginBottom: '16px' }}>
            <div className={classes.listRoot}>
              {games.map(
                ({
                  teams: teamsPlaying,
                  gamePk,
                  status,
                  gameDate,
                  linescore
                }) => (
                  <Paper
                    key={gamePk}
                    classes={{ root: classes.card }}
                    style={{ marginBottom: '8px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography style={{ marginRight: '24px' }}>
                        23:00
                      </Typography>
                      <div>
                        <div>
                          <Typography>Washington Capitals</Typography>
                        </div>
                        <Divider style={{ margin: '8px 0px' }} />
                        <div>
                          <Typography>Carolina Hurricanes</Typography>
                        </div>
                      </div>
                    </div>
                  </Paper>
                )
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
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

  return <>{generateDateListView(date, games, index)}</>;
};

export default ScheduleListView;
