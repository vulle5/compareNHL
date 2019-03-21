import React, { useState } from "react";
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

import { seasonTabsStyles } from '../styles/jss-styles';

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const SeasonTabs = props => {
  const [value, setValue] = useState(0);
  const { classes, theme } = props;

  const handleChange = (value) => {
    setValue(value);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>Item One</TabContainer>
        <TabContainer dir={theme.direction}>Item Two</TabContainer>
        <TabContainer dir={theme.direction}>Item Three</TabContainer>
      </SwipeableViews>
    </div>
  );
}

export default withStyles(seasonTabsStyles, { withTheme: true })(SeasonTabs);
