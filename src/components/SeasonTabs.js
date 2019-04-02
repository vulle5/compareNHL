import React, { useState, useEffect, useRef } from "react";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { ScrollTo } from "react-scroll-to";
import _ from 'lodash';
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
  const { classes, theme, width, player, player: { id } } = props;
  const swipeableRef = useRef(null);

  const findLastNHLSeason = ({ stats: {0: {splits}} }) => {
    return _.findLast(splits, element => {
      return element.league.name === "National Hockey League";
    });
  };

  useEffect(() => {
    swipeableRef.current.updateHeight();
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
      <ScrollTo>
        { ({ scrollTo }) => <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          onTransitionEnd={() => scrollTo({ x: 0, y: 500, smooth: "true"})}
          animateHeight
          ref={swipeableRef}
        >
          <TabContainer dir={theme.direction} width={width}>
            <CareerTable player={player} swipeReferences={swipeableRef} />
          </TabContainer>
          <TabContainer dir={theme.direction} width={width}>
            <GameLogs playerId={id} player={player} lastSeason={findLastNHLSeason(player)} swipeReferences={swipeableRef}/>
          </TabContainer>
          <TabContainer dir={theme.direction} width={width}>
            Item Three both
          </TabContainer>
        </SwipeableViews>}
      </ScrollTo>
    </div>
  );
};

export default withWidth()(
  withStyles(seasonTabsStyles, { withTheme: true })(SeasonTabs)
);
