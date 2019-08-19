import React from "react";
import { connect } from "react-redux";
import { find, findLast } from "lodash";
import { Typography } from "@material-ui/core";

import CareerFilter from "../CareerFilter";
import AdvancedList from "./AdvancedList";
import DisplayFilter from "../DisplayFilter";

const AdvancedStats = ({
  swipeReferences,
  selectedFilter,
  playerSeasons,
  filteredSeason
}) => {
  return (
    <div>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Advanced Stats
      </Typography>
      <CareerFilter
        swipeReferences={swipeReferences}
        filterKey="advancedStats"
        filterNames={playerSeasons}
      />
      <DisplayFilter
        selectedFilter={
          selectedFilter.slice(0, 4) + "-" + selectedFilter.slice(4)
        }
      />
      <AdvancedList seasons={filteredSeason} />
    </div>
  );
};

const createFilters = allSeasons => [
  ...new Set(
    allSeasons
      .filter(season => season.league.name === "NHL")
      .map(season => season.season.slice(0, 4) + "-" + season.season.slice(4))
  )
];

const getSelectedSeason = (allSeasons, selectedFilter) =>
  find(allSeasons.filter(season => season.league.name === "NHL"), {
    season: selectedFilter
  });

const getLastSeason = allSeasons =>
  findLast(allSeasons, season => season.league.name === "NHL").season;

const mapStateToProps = state => {
  const {
    player: {
      stats: {
        0: { splits }
      }
    }
  } = state;
  const selectedFilter = state.filter.advancedStats
    ? state.filter.advancedStats.replace("-", "")
    : getLastSeason(splits);

  return {
    selectedFilter,
    filteredSeason: getSelectedSeason(splits, selectedFilter),
    playerSeasons: createFilters(splits)
  };
};

export default connect(
  mapStateToProps,
  null
)(AdvancedStats);
