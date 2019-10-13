import React, { useState } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  useMediaQuery
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/styles';
import GameOverview from './GameOverview';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box style={{ padding: matches ? '0px' : '24px' }} p={3}>
        {children}
      </Box>
    </Typography>
  );
}

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
          aria-label="full width tabs example"
        >
          <Tab label="Game Overview" {...a11yProps(0)}></Tab>
          <Tab label="Statistics" {...a11yProps(1)}></Tab>s
          <Tab label="Rosters" {...a11yProps(2)}></Tab>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ paddingTop: matches ? '16px' : '0px' }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <GameOverview />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default GameDetailTabs;
