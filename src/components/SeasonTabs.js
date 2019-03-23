import React, { useState } from "react";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import SwipeableViews from "react-swipeable-views";

import { seasonTabsStyles } from "../styles/jss-styles";
import CareerTable from "./CareerTable";

const TabContainer = ({ children, dir, width }) => {
  return (
    <Typography
      component="div"
      dir={dir}
      style={isWidthUp("sm", width) ? { padding: 8 * 3 } : null}
    >
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
        {isWidthUp("sm", width) ? (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Career Stats" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Player" />
            <Tab label="Career Stats" />
            <Tab label="Item Three" />
          </Tabs>
        )}
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {isWidthUp("sm", width) ? (
          /* Desktop */
          <TabContainer dir={theme.direction} width={width}>
            <CareerTable player={player} />
          </TabContainer>
        ) : (
          /* Mobile */
          <TabContainer dir={theme.direction}>
            {playerInfoJSX(player)}
          </TabContainer>
        )}
        {isWidthUp("sm", width) ? (
          <TabContainer dir={theme.direction} width={width}>
            Item
          </TabContainer>
        ) : (
          <TabContainer dir={theme.direction} width={width}>
            <CareerTable player={player} />
          </TabContainer>
        )}
        {isWidthUp("sm", width) ? (
          <TabContainer dir={theme.direction} width={width}>
            Item Three both
          </TabContainer>
        ) : (
          <TabContainer dir={theme.direction} width={width}>
            Item
          </TabContainer>
        )}
      </SwipeableViews>
    </div>
  );
};

export default withWidth()(
  withStyles(seasonTabsStyles, { withTheme: true })(SeasonTabs)
);
