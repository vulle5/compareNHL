import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

import { seasonTableStyles } from "../styles/jss-styles";
import StatTable from "./StatTable";
import CareerFilter from "./CareerFilter";

const CareerTable = props => {
  const {
    classes, width,
    player: {
      stats: {
        0: {
          splits
        }
      }
    }
  } = props;
  const [filteredData , setFilteredData] = useState([]);
  const [originalData , setOriginalData] = useState([]);
  const [filteredNames , setFilteredNames] = useState([]);

  let id = 0;
  const createData = (name, team, season, games, points, goals, assists) => {
    id += 1;
    return { id, name, team, season, games, points, goals, assists };
  };

  const removeDuplicates = data => {
    let a = [];
    data.forEach(object => {
       const name = object.name;
       a.push(name);
    });
    setFilteredNames([...new Set(a)]);
  };

  useEffect(() => {
    let rows = [];
    splits.forEach(season => {
      let seasonWithDash = season.season.slice(0,4) + "-" + season.season.slice(4);
      let a = createData(season.league.name, season.team.name, seasonWithDash, season.stat.games, season.stat.points, season.stat.goals, season.stat.assists);
      rows.push(a);
    });
    setOriginalData(rows);
    setFilteredData(rows);
    // Function below
    removeDuplicates(rows);
  }, []);

  const dataFilter = filter => {
    if (filter === '') {
      setFilteredData(originalData);
    } else {
      setFilteredData(originalData.filter(row => row.name === filter));
    }
  };

  // const replacer = season => {
  //   let newSeason = season.replace(/^\d{2}|-\d{2}/g, '');
  //   newSeason = newSeason.slice(0,2) + "-" + newSeason.slice(2);
  //   return newSeason;
  // };

  return (
    <div className={classes.root}>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Career
      </Typography>
      <CareerFilter dataFilter={dataFilter} filterNames={filteredNames}/>
      <StatTable
        headCells={["League", "Team", "Season", "GP", "P", "G", "A"]}
        bodyCells={filteredData}
        tableCells={filteredData}
      />
    </div>
  );
};

export default withWidth()(withStyles(seasonTableStyles)(CareerTable));
