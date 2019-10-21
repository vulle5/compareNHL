import React from 'react';
import { Typography, Card, IconButton, useMediaQuery } from '@material-ui/core';
import BackArrow from '@material-ui/icons/ArrowBack';
import ForwardArrow from '@material-ui/icons/ArrowForward';
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
  const matches = useMediaQuery('(min-width:680px)');

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
        return (
          <ScheduleListItem
            key={gamePk}
            gamePk={gamePk}
            gameDate={gameDate}
            home={teamsPlaying.home}
            away={teamsPlaying.away}
            linescore={linescore}
            status={status}
          />
        );
      default:
        break;
    }
    return null;
  }

  const generateDateButtons = () => {
    if (matches) {
      return (
        <>
          <IconButton
            style={{ margin: '0px 8px' }}
            onClick={() => handleDateChange(moment(date).subtract(1, 'days'))}
          >
            <BackArrow />
          </IconButton>
          <DatePicker date={datePicker} handleDateChange={handleDateChange} />
          <IconButton
            style={{ margin: '0px 8px' }}
            onClick={() => handleDateChange(moment(date).add(1, 'days'))}
          >
            <ForwardArrow />
          </IconButton>
        </>
      );
    } else {
      return (
        <div style={{ display: 'flex' }}>
          <DatePicker date={datePicker} handleDateChange={handleDateChange} />
          <div style={{ alignSelf: 'center', textAlign: 'center' }}>
            <IconButton
              style={{ marginRight: '4px' }}
              onClick={() => handleDateChange(moment(date).subtract(1, 'days'))}
            >
              <BackArrow />
            </IconButton>
            <IconButton
              style={{ marginLeft: '4px' }}
              onClick={() => handleDateChange(moment(date).add(1, 'days'))}
            >
              <ForwardArrow />
            </IconButton>
          </div>
        </div>
      );
    }
  };

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
            {index === 0 && generateDateButtons()}
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

  return <>{generateScheduleListView(date, games, index)}</>;
};

export default ScheduleList;
