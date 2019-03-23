import React, { useState } from "react";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import SwipeableViews from "react-swipeable-views";

import { seasonTabsStyles } from "../styles/jss-styles";

const TabContainer = ({ children, dir, width }) => {
  return (
    <Typography component="div" dir={dir} style={isWidthUp('sm', width) ? { padding: 8 * 3 } : null}>
      {children}
    </Typography>
  );
};

const SeasonTabs = props => {
  const [value, setValue] = useState(0);
  const { classes, theme, width, playerInfoJSX, player } = props;

  // Do NOT remove the 'event' argument
  const handleChange = (event, value) => {
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
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* TODO: Add PlayerInfo to the TabContainer as child when on mobile */}
        {isWidthUp("sm", width) ? (
          <TabContainer dir={theme.direction} width={width}>Item One</TabContainer>
        ) : (
          <TabContainer dir={theme.direction}>{playerInfoJSX(player)}</TabContainer>
        )}
        <TabContainer dir={theme.direction} width={width}>Item Two</TabContainer>
        <TabContainer dir={theme.direction} width={width}>Item Three</TabContainer>
      </SwipeableViews>
    </div>
  );
};

export default withWidth()(
  withStyles(seasonTabsStyles, { withTheme: true })(SeasonTabs)
);
