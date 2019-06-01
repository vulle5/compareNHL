import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Typography } from "@material-ui/core";

import CareerFilter from "./CareerFilter";
import AdvancedList from "./AdvancedList";
import DisplayFilter from "./DisplayFilter";

const AdvancedStats = ({
  player,
  swipeReferences,
  nhlSeasons,
  lastSeason: { season: latestSeason }
}) => {
  const [filteredSeasons, setFilteredSeasons] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(latestSeason);
  const [selectedFilter, setSelectedFilter] = useState(
    latestSeason.slice(0, 4) + "-" + latestSeason.slice(4)
  );

  const selectedSeason = seasons => {
    return _.find(seasons, { season: currentFilter });
  };

  useEffect(() => {
    const createFilters = () => {
      const a = nhlSeasons.map(
        season => season.season.slice(0, 4) + "-" + season.season.slice(4)
      );
      return [...new Set(a)];
    };

    setFilteredSeasons(createFilters());
  }, [nhlSeasons]);

  const dataFilter = filter => {
    setSelectedFilter(filter);
    setCurrentFilter(filter.replace("-", ""));
  };

  return (
    <div>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Advanced Stats
      </Typography>
      <CareerFilter
        swipeReferences={swipeReferences}
        dataFilter={dataFilter}
        filterNames={filteredSeasons}
      />
      <DisplayFilter selectedFilter={selectedFilter} />
      <AdvancedList seasons={selectedSeason(nhlSeasons)} />
    </div>
  );
};

export default AdvancedStats;
