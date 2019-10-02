import React from 'react';
import { Typography, Paper, Divider, useMediaQuery } from '@material-ui/core';
import moment from 'moment';

import { useScheduleListItemStyles } from '../../../styles/useStyles';
import DatePicker from '../DatePicker';
import ScheduleListItemOverview from './ScheduleListItemOverview';

const ScheduleListItem = ({ gamePk }) => {
  const classes = useScheduleListItemStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  // const generateDateListView = (date, games, index) => {
  //   if (games.length) {
  //     return (
  //       <div>
  //         <div
  //           style={{
  //             marginBottom: '16px',
  //             display: 'flex',
  //             flexWrap: 'wrap',
  //             alignItems: 'center'
  //           }}
  //         >
  //           <Typography variant="h4" style={{ marginRight: '16px' }}>
  //             {getTitle(date)}
  //           </Typography>
  //           <div style={{ marginRight: '32px' }}>
  //             ({`UTC${moment(date).format('Z')}`})
  //           </div>
  //           {index === 0 && (
  //             <DatePicker
  //               date={datePicker}
  //               handleDateChange={handleDateChange}
  //             />
  //           )}
  //         </div>
  //         <div style={{ marginBottom: '16px' }}>
  //           <div className={classes.listRoot}>
  //             {games.map(
  //               ({
  //                 teams: teamsPlaying,
  //                 gamePk,
  //                 status,
  //                 gameDate,
  //                 linescore
  //               }) => (
  //                 <Paper
  //                   key={gamePk}
  //                   classes={{ root: classes.card }}
  //                   style={{ marginBottom: '8px' }}
  //                 >
  //                   <div style={{ display: 'flex', alignItems: 'center' }}>
  //                     <Typography style={{ marginRight: '24px' }}>
  //                       23:00
  //                     </Typography>
  //                     <div>
  //                       <div>
  //                         <Typography>Washington Capitals</Typography>
  //                       </div>
  //                       <Divider style={{ margin: '8px 0px' }} />
  //                       <div>
  //                         <Typography>Carolina Hurricanes</Typography>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </Paper>
  //               )
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div>
  //       <div className={classes.emptyGameWrapper}>
  //         <Typography variant="h4" style={{ marginRight: '16px' }}>
  //           {getTitle(date)}
  //         </Typography>
  //         <div style={{ marginRight: '32px' }}>
  //           ({`UTC${moment(date).format('Z')}`})
  //         </div>
  //         {index === 0 && (
  //           <DatePicker date={datePicker} handleDateChange={handleDateChange} />
  //         )}
  //       </div>
  //       <Card className={classes.emptyGameCard}>
  //         <Typography>No games for this day</Typography>
  //       </Card>
  //     </div>
  //   );
  // };

  return (
    <div className={classes.listRoot}>
      <Paper classes={{ root: classes.card }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={{ marginRight: '24px' }}>23:00</Typography>
          <div style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography>Washington Capitals</Typography>
              <div
                style={{
                  display: 'flex',
                  marginLeft: '64px',
                  alignItems: 'center'
                }}
              >
                <Typography
                  style={{
                    marginRight: '40px',
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}
                >
                  3
                </Typography>
                {matches && <ScheduleListItemOverview />}
              </div>
            </div>
            <Divider style={{ margin: '8px 0px' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography>Carolina Hurricanes</Typography>
              <div
                style={{
                  display: 'flex',
                  marginLeft: '64px',
                  alignItems: 'center'
                }}
              >
                <Typography
                  style={{
                    marginRight: '40px',
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}
                >
                  2
                </Typography>
                {matches && <ScheduleListItemOverview />}
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ScheduleListItem;
