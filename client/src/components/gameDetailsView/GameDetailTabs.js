import React, { useState } from 'react';
import { AppBar, Tabs, Tab, useMediaQuery } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/styles';
import GameOverview from './GameOverview';
import Rosters from './Rosters';
import TabPanel from '../TabPanel';

const GameDetailTabs = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="Game Overview" {...a11yProps(0)}></Tab>
          {/*<Tab disabled label="Statistics" {...a11yProps(1)}></Tab>*/}
          <Tab label="Rosters" {...a11yProps(2)}></Tab>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ paddingTop: matches ? '16px' : '0px' }}
        disabled={value === 1 ? true : false}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <GameOverview />
        </TabPanel>
        {/* {<TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>} */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Rosters />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default GameDetailTabs;
