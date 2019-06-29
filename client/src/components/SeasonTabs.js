import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { ScrollTo } from "react-scroll-to";
import _ from "lodash";
import SwipeableViews from "react-swipeable-views";

import { seasonTabsStyles } from "../styles/jss-styles";
import CareerTable from "./CareerTable";
import GameLogs from "./GameLogs";
import AdvancedStats from "./AdvancedStats";
import TabContainer from "./TabContainer";

const SeasonTabs = props => {
  const {
    classes,
    theme,
    width,
    player,
    player: { id },
    player: {
      primaryPosition: { abbreviation: isGoalie }
    },
    nhlSeasons,
    lastNhlSeason
  } = props;

  const [value, setValue] = useState(0);
  const appBarRef = useRef();
  // TODO: Think about adding this to redux
  const swipeableRef = useRef();

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
    <div className={classes.root} ref={appBarRef}>
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
        {({ scrollTo }) => (
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            onTransitionEnd={() =>
              scrollTo({ y: appBarRef.current.offsetTop, smooth: "true" })
            }
            animateHeight
            ref={swipeableRef}
          >
            <TabContainer dir={theme.direction} width={width}>
              <CareerTable
                player={player}
                swipeReferences={swipeableRef}
                isGoalie={isGoalie === "G"}
              />
            </TabContainer>
            {/* <TabContainer dir={theme.direction} width={width}>
              {isEmpty(lastNhlSeason) ? (
                <Typography variant="subheading" style={{ padding: "8px" }}>
                  No NHL Data
                </Typography>
              ) : (
                <GameLogs
                  playerId={id}
                  player={player}
                  lastSeason={lastNhlSeason}
                  swipeReferences={swipeableRef}
                  isGoalie={isGoalie === "G"}
                />
              )}
            </TabContainer>
            <TabContainer dir={theme.direction} width={width}>
              <AdvancedStats
                player={player}
                nhlSeasons={nhlSeasons}
                lastSeason={lastNhlSeason}
                swipeReferences={swipeableRef}
                isGoalie={isGoalie === "G"}
              />
            </TabContainer> */}
          </SwipeableViews>
        )}
      </ScrollTo>
    </div>
  );
};

const findNHLSeasons = splits =>
  splits.filter(season => season.league.name === "NHL");

const findLastNHLSeason = splits => {
  return _.findLast(splits, element => {
    return element.league.name === "NHL" || [];
  });
};

const mapStateToProps = state => {
  const {
    player: {
      stats: {
        0: { splits }
      }
    }
  } = state;
  return {
    player: state.player,
    nhlSeasons: findNHLSeasons(splits),
    lastNhlSeason: findLastNHLSeason(splits)
  };
};

export default connect(
  mapStateToProps,
  null
)(withWidth()(withStyles(seasonTabsStyles, { withTheme: true })(SeasonTabs)));
