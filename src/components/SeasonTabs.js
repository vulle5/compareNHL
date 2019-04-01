import React, { useState, useEffect, useRef } from "react";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import SwipeableViews from "react-swipeable-views";

import { seasonTabsStyles } from "../styles/jss-styles";
import CareerTable from "./CareerTable";
import GameLogs from "./GameLogs";

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
  // const [height, setHeight] = useState(0);
  const { classes, theme, width, player } = props;
  const swipeableRef = useRef(null);

  useEffect(() => {
    const { current } = swipeableRef;
    current.updateHeight();
  });

  // Do NOT remove the 'event' argument
  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position={isWidthUp("sm", width) ? "static" : "sticky"}
        color="default"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Career Stats" />
          <Tab label="Game Logs" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        animateHeight
        ref={swipeableRef}
      >
        <TabContainer dir={theme.direction} width={width}>
          <CareerTable player={player} />
        </TabContainer>
        <TabContainer dir={theme.direction} width={width}>
          <GameLogs />
        </TabContainer>
        <TabContainer dir={theme.direction} width={width}>
          Item Three both
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

export default withWidth()(
  withStyles(seasonTabsStyles, { withTheme: true })(SeasonTabs)
);
