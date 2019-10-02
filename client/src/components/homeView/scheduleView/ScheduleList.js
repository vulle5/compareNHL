import React from 'react';
import { Typography, Card } from '@material-ui/core';
import moment from 'moment';

import { useScheduleListStyles } from '../../../styles/useStyles';
import ScheduleCardItem from './ScheduleCardItem';
import DatePicker from '../DatePicker';
import ScheduleListItem from './ScheduleListItem';

const ScheduleList = ({
  getTitle,
  datePicker,
  handleDateChange,
  date,
  games,
  index,
  viewStyle
}) => {
  const classes = useScheduleListStyles();

  function generateScheduleItem(
    gamePk,
    gameDate,
    teamsPlaying,
    linescore,
    status
  ) {
    switch (viewStyle) {
      case 'card':
        return (
          <ScheduleCardItem
            key={gamePk}
            gamePk={gamePk}
            gameDate={gameDate}
            home={teamsPlaying.home}
            away={teamsPlaying.away}
            linescore={linescore}
            status={status}
          />
        );
      case 'list':
        return <ScheduleListItem key={gamePk} gamePk={gamePk} />;
      default:
        break;
    }
    return;
  }

  const generateScheduleListView = (date, games, index) => {
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
          <div
            className={classes.gameWrapper}
            style={viewStyle === 'list' ? { display: 'block' } : null}
          >
            {games.map(
              ({ teams: teamsPlaying, gamePk, status, gameDate, linescore }) =>
                generateScheduleItem(
                  gamePk,
                  gameDate,
                  teamsPlaying,
                  linescore,
                  status
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

  return <>{generateScheduleListView(date, games, index)}</>;
};

export default ScheduleList;
