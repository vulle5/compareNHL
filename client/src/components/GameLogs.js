import React, { useState, useEffect, useCallback, Fragment } from "react";
import typy from "typy";
import _ from "lodash";
import { Typography, Switch, FormControlLabel } from "@material-ui/core";

import StatTable from "./StatTable";
import { useGetPlayerInfo } from "../functions/useGetPlayerInfo";
import CareerFilter from "./CareerFilter";
import DisplayFilter from "./DisplayFilter";

const GameLogs = ({
  playerId,
  player: {
    stats: {
      0: { splits: allSeasons }
    }
  },
  swipeReferences,
  isGoalie,
  lastSeason: { season }
}) => {
  const createFilters = useCallback(() => {
    const a = allSeasons
      .filter(season => season.league.name === "National Hockey League")
      .map(season => season.season.slice(0, 4) + "-" + season.season.slice(4));
    return [...new Set(a)];
  }, [allSeasons]);

  const [games, setGames] = useState([]);
  const [filteredSeasons, setFilteredSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(season);
  const [playoffSelected, setPlayoffSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(_.last(createFilters()));

  let response = useGetPlayerInfo(
    playerId,
    `logs?stats=gameLog&expand=stats.team&season=${currentSeason}`
  );
  let playoffResponse = useGetPlayerInfo(
    playerId,
    `logs?stats=playoffGameLog&expand=stats.team&season=${currentSeason}`
  );

  useEffect(() => {
    let id = 0;
    const createData = (
      date,
      against,
      pointsOrSA,
      goalsOrSaves,
      assistsOrSP,
      toi
    ) => {
      id += 1;
      return { id, date, against, pointsOrSA, goalsOrSaves, assistsOrSP, toi };
    };

    const makeRows = splits => {
      const rows = splits.map(season =>
        createData(
          season.date,
          season.isHome
            ? season.opponent.abbreviation
            : season.opponent.abbreviation.replace(/^/, "@"),
          isGoalie ? season.stat.shotsAgainst : season.stat.points,
          isGoalie ? season.stat.saves : season.stat.goals,
          isGoalie
            ? season.stat.savePercentage.toFixed(3)
            : season.stat.assists,
          season.stat.timeOnIce
        )
      );
      setGames(rows);
      setFilteredSeasons(createFilters());
    };

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

      playoffSelected === true ? makeRows(playoffSplits) : makeRows(splits);

      // Check if Player has playoff games for specific season
      if (playoffSplits.length === 0) {
        setIsDisabled(true);
        setPlayoffSelected(false);
      } else {
        setIsDisabled(false);
      }
    }
  }, [
    response,
    playoffResponse,
    playoffSelected,
    allSeasons,
    isGoalie,
    createFilters
  ]);

  const dataFilter = filter => {
    setSelectedFilter(filter);
    // This causes new network request with specific season
    setCurrentSeason(filter.replace("-", ""));
  };

  const handleChange = event => {
    setPlayoffSelected(event.target.checked);
  };

  return (
    <div>
      <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
        Game Logs
      </Typography>
      {games ? (
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
      <DisplayFilter
        style={{ paddingTop: "16px" }}
        selectedFilter={selectedFilter}
      />
      {games ? (
        <StatTable
          headCells={
            isGoalie
              ? ["Date", "Team", "SA", "S", "S%", "TOI"]
              : ["Date", "Team", "P", "G", "A", "TOI"]
          }
          bodyCells={games}
          tableCells={games}
        />
      ) : null}
    </div>
  );
};

export default GameLogs;
