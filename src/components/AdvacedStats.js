import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { Typography } from "@material-ui/core";

import CareerFilter from "./CareerFilter";
import AdvancedList from "./AdvancedList";

const AdvacedStats = ({ player, swipeReferences, nhlSeasons, lastSeason: { season: latestSeason } }) => {

	const [filteredSeasons, setFilteredSeasons] = useState([]);
	const [currentFilter, setCurrentFilter] = useState(latestSeason);

	const createFilters = () => {
    let a = [];
    nhlSeasons.forEach(season => {
      if (season.league.name === "National Hockey League") {
        const seasonWithDash =
          season.season.slice(0, 4) + "-" + season.season.slice(4);
        a.push(seasonWithDash);
      }
    });
    return [...new Set(a)];
	};

	const selectedSeason = seasons => {
		return _.find(seasons, { season: currentFilter });
	}

	useEffect(() => {
		setFilteredSeasons(createFilters());
	}, [currentFilter])

	const dataFilter = filter => {
		let season = filter.replace("-", "");
    setCurrentFilter(season);
  };

  return (
		<div>
			<Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Advanced Stats
      </Typography>
			<CareerFilter swipeReferences={swipeReferences} dataFilter={dataFilter} filterNames={filteredSeasons} />
			<AdvancedList seasons={selectedSeason(nhlSeasons)} />
		</div>
	);
}

export default AdvacedStats
