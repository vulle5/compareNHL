import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

import { seasonTableStyles } from "../styles/jss-styles";
import StatTable from "./StatTable";
import CareerFilter from "./CareerFilter";
import DisplayFilter from "./DisplayFilter";

const CareerTable = props => {
  const {
    classes,
    swipeReferences,
    isGoalie,
    width,
    player: {
      stats: {
        0: { splits }
      }
    }
  } = props;
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Show all");

  // Function removes duplicate leagues from the list so we
  // can make filters out of them
  const removeDuplicates = data =>
    setFilteredNames([...new Set(data.map(object => object.name))]);

  useEffect(() => {
    let id = 0;
    const createData = (
      name,
      team,
      season,
      games,
      pointsOrWins,
      goalsOrLosses,
      assistsOrGAA
    ) => {
      id += 1;
      return {
        id,
        name,
        team,
        season,
        games,
        pointsOrWins,
        goalsOrLosses,
        assistsOrGAA
      };
    };
    const rows = splits.map(season =>
      createData(
        season.league.name,
        season.league.name === "NHL" && isWidthDown("sm", width)
          ? season.team.abbreviation
          : season.team.name,
        season.season.slice(0, 4) + "-" + season.season.slice(4),
        season.stat.games,
        isGoalie ? season.stat.wins : season.stat.points,
        isGoalie ? season.stat.losses : season.stat.goals,
        isGoalie
          ? season.stat.goalAgainstAverage.toFixed(2)
          : season.stat.assists
      )
    );
    setOriginalData(rows);
    setFilteredData(rows);
    // Function below not a hook
    removeDuplicates(rows);
  }, [isGoalie, splits, width]);

  const dataFilter = filter => {
    if (filter.length === 0) {
      setFilteredData(originalData);
      setSelectedFilter("Show all");
    } else {
      setFilteredData(originalData.filter(row => row.name === filter));
      setSelectedFilter(filter);
    }
  };

  return (
    <div className={classes.root}>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Career
      </Typography>
      <CareerFilter
        dataFilter={dataFilter}
        filterNames={filteredNames}
        swipeReferences={swipeReferences}
        showAll
      />
      <DisplayFilter selectedFilter={selectedFilter} />
      <StatTable
        headCells={
          isGoalie
            ? ["League", "Team", "Season", "GP", "W", "L", "GAA"]
            : ["League", "Team", "Season", "GP", "P", "G", "A"]
        }
        bodyCells={filteredData}
        tableCells={filteredData}
      />
    </div>
  );
};

export default withWidth()(withStyles(seasonTableStyles)(CareerTable));
