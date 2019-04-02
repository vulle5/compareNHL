import React, {useState, useEffect} from "react";
import typy from 'typy';
import {Typography} from "@material-ui/core";

import StatTable from "./StatTable";
import {getPlayerInfo} from "../functions/getPlayerInfo";
import CareerFilter from "./CareerFilter";

const GameLogs = ({ playerId, player: {stats: {0: { splits }}}, swipeReferences, lastSeason: { season } }) => {
  const [seasons, setSeasons]= useState([]);
  const [filteredSeasons , setFilteredSeasons] = useState([]);
  // Change so that initial state comes from last season the current player has played
  const [currentSeason, setCurrentSeason] = useState(season);

  let response = getPlayerInfo(playerId, `stats?stats=gameLog&expand=stats.team&season=${currentSeason}`);

  let id = 0;
  const createData = (date, against, points, goals, assists, toi) => {
    id += 1;
    return { id, date, against, points, goals, assists, toi };
  };

  const createFilters = () => {
    let a = [];
    splits.forEach(season => {
      if (season.league.name === "National Hockey League") {
        let seasonWithDash = season.season.slice(0,4) + "-" + season.season.slice(4);
        a.push(seasonWithDash);
      }
    });
    return [...new Set(a)];
  };

  const makeRows = splits => {
    let rows = [];
    splits.forEach(season => {
      let isAwayOrHome = season.isHome ? season.opponent.abbreviation : season.opponent.abbreviation.replace(/^/,'@');
      let a = createData(season.date, isAwayOrHome, season.stat.points, season.stat.goals, season.stat.assists, season.stat.timeOnIce);
      rows.push(a);
    });
    setSeasons(rows);
    setFilteredSeasons(createFilters());
  };

  useEffect(() => {
    if (typy(response, 'copyright').safeObject) {
      const { stats: {0: { splits }}} = response;
      makeRows(splits);
    } else {
      console.log("Not There yet!")
    }
  }, [response]);

  const dataFilter = filter => {
    let season = filter.replace("-", "");
    setCurrentSeason(season);
  };

  return (
    <div>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Game Logs
      </Typography>
      {setSeasons
        ?
          <CareerFilter dataFilter={dataFilter} swipeReferences={swipeReferences} filterNames={filteredSeasons}/>
        : null}
      {setSeasons
        ?
          <StatTable
            headCells={["Date", "Team", "P", "G", "A", "TOI"]}
            bodyCells={seasons}
            tableCells={seasons}
          />
        : null}
    </div>
  );
};

export default GameLogs;
