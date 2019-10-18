import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppBar, Tabs, Tab, useMediaQuery } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/styles';

import TabPanel from '../TabPanel';
import RosterTeamList from './RosterTeamList';

const Rosters = ({ teams: { home, away } }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  // console.log(home);
  // console.log(away);
  const homePlayers = [...Object.keys(home.players).map(i => home.players[i])];
  const awayPlayers = [...Object.keys(away.players).map(i => away.players[i])];
  return (
    <div>
      <AppBar
        position="static"
        color="default"
        style={{ maxWidth: '75%', margin: 'auto' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label={home.team.name}></Tab>
          <Tab label={away.team.name}></Tab>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ paddingTop: matches ? '16px' : '0px' }}
        disabled
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <RosterTeamList
            players={home.players}
            forwards={homePlayers.filter(
              ({ position }) =>
                position.code === 'L' ||
                position.code === 'C' ||
                position.code === 'R'
            )}
            defense={homePlayers.filter(
              ({ position }) => position.code === 'D'
            )}
            goalies={homePlayers.filter(
              ({ position }) => position.code === 'G'
            )}
            teamName={home.team.name}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <RosterTeamList
            players={away.players}
            forwards={awayPlayers.filter(
              ({ position }) =>
                position.code === 'L' ||
                position.code === 'C' ||
                position.code === 'R'
            )}
            defense={awayPlayers.filter(
              ({ position }) => position.code === 'D'
            )}
            goalies={awayPlayers.filter(
              ({ position }) => position.code === 'G'
            )}
            teamName={away.team.name}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

const mapStateToProps = ({
  gameDetail: {
    liveData: {
      boxscore: { teams }
    }
  }
}) => {
  return {
    teams
  };
};

export default connect(mapStateToProps)(Rosters);
