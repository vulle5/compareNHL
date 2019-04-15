import React, { useState, useEffect, Fragment } from "react";
import typy from "typy";
import { Typography, Switch, FormControlLabel } from "@material-ui/core";

import StatTable from "./StatTable";
import { getPlayerInfo } from "../functions/getPlayerInfo";
import CareerFilter from "./CareerFilter";

const GameLogs = ({
  playerId,
  player: {
    stats: {
      0: { splits: allSeasons }
    }
  },
  swipeReferences,
  lastSeason: { season }
}) => {
  const [games, setGames] = useState([]);
  const [filteredSeasons, setFilteredSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(season);
  const [playoffSelected, setPlayoffSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  let response = getPlayerInfo(
    playerId,
    `stats?stats=gameLog&expand=stats.team&season=${currentSeason}`
  );
  let playoffResponse = getPlayerInfo(
    playerId,
    `stats?stats=playoffGameLog&expand=stats.team&season=${currentSeason}`
  );

  let id = 0;
  const createData = (date, against, points, goals, assists, toi) => {
    id += 1;
    return { id, date, against, points, goals, assists, toi };
  };

  const createFilters = () => {
    let a = [];
    allSeasons.forEach(season => {
      if (season.league.name === "National Hockey League") {
        const seasonWithDash =
          season.season.slice(0, 4) + "-" + season.season.slice(4);
        a.push(seasonWithDash);
      }
    });
    return [...new Set(a)];
  };

  const makeRows = splits => {
    let rows = [];
    splits.forEach(season => {
      const isAwayOrHome = season.isHome
        ? season.opponent.abbreviation
        : season.opponent.abbreviation.replace(/^/, "@");
      const a = createData(
        season.date,
        isAwayOrHome,
        season.stat.points,
        season.stat.goals,
        season.stat.assists,
        season.stat.timeOnIce
      );
      rows.push(a);
    });
    setGames(rows);
    setFilteredSeasons(createFilters());
  };

  useEffect(() => {
    if (
      typy(response, "copyright").safeObject &&
      typy(playoffResponse, "copyright").safeObject
    ) {
      const {
        stats: {
          0: { splits }
        }
      } = response;
      const {
        stats: {
          0: { splits: playoffSplits }
        }
      } = playoffResponse;
      if (playoffSelected === true) {
        makeRows(playoffSplits);
      } else {
        makeRows(splits);
      }
      // Check if Player has playoff games for specific season
      if (playoffSplits.length === 0) {
        setIsDisabled(true);
        setPlayoffSelected(false);
      } else {
        setIsDisabled(false);
      }
    }
  }, [response, playoffResponse, playoffSelected]);

  const dataFilter = filter => {
    let season = filter.replace("-", "");
    // This causes new network request with specific season
    setCurrentSeason(season);
  };

  const handleChange = event => {
    setPlayoffSelected(event.target.checked);
  };

  return (
    <div>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Game Logs
      </Typography>
      {setGames ? (
        <Fragment>
          <CareerFilter
            dataFilter={dataFilter}
            swipeReferences={swipeReferences}
            filterNames={filteredSeasons}
          />
          <FormControlLabel
            control={
              <Switch
                checked={playoffSelected}
                onChange={handleChange}
                color="primary"
                disabled={isDisabled}
              />
            }
            label="Playoff"
          />
        </Fragment>
      ) : (
        <Typography variant="subheading">No NHL Data</Typography>
      )}
      {setGames ? (
        <StatTable
          headCells={["Date", "Team", "P", "G", "A", "TOI"]}
          bodyCells={games}
          tableCells={games}
        />
      ) : null}
    </div>
  );
};

export default GameLogs;
