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
import AdvacedStats from "./AdvacedStats";

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
  const {
    classes,
    theme,
    width,
    player,
    player: { id },
    player: { primaryPosition: { abbreviation: isGoalie } },
    player: { stats: { 0: { splits } } } } = props;

  const [value, setValue] = useState(0);
  const swipeableRef = useRef(null);

  const findLastNHLSeason = (splits) => {
    return _.findLast(splits, element => {
      return element.league.name === "National Hockey League";
    });
  };

  const findNHLSeasons = (splits) => {
    let rows = [];
    splits.forEach(season => {
      if (season.league.name === "National Hockey League") {
        rows.push(season);
      }
    });
    return rows;
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
          <Tab label="Advanced" />
        </Tabs>
      </AppBar>
      <ScrollTo>
        {({ scrollTo }) => <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          onTransitionEnd={() => scrollTo({ x: 0, y: 500, smooth: "true" })}
          animateHeight
          ref={swipeableRef}
        >
          <TabContainer dir={theme.direction} width={width}>
            <CareerTable player={player} swipeReferences={swipeableRef} isGoalie={isGoalie === "G"} />
          </TabContainer>
          <TabContainer dir={theme.direction} width={width}>
            {typeof findLastNHLSeason(splits) === 'undefined'
              ? <Typography variant="subheading" style={{ padding: "8px" }}>No NHL Data</Typography>
              : <GameLogs playerId={id} player={player} lastSeason={findLastNHLSeason(splits)} swipeReferences={swipeableRef} isGoalie={isGoalie === "G"} />
            }
          </TabContainer>
          <TabContainer dir={theme.direction} width={width}>
            <AdvacedStats player={player} nhlSeasons={findNHLSeasons(splits)} lastSeason={findLastNHLSeason(splits)} swipeReferences={swipeableRef} isGoalie={isGoalie === "G"}/>
          </TabContainer>
        </SwipeableViews>}
      </ScrollTo>
    </div>
  );
};

export default withWidth()(
  withStyles(seasonTabsStyles, { withTheme: true })(SeasonTabs)
);
