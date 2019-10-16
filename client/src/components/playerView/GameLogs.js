import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { findLast, isEmpty, has } from 'lodash';
import { Typography, Switch, FormControlLabel } from '@material-ui/core';

import {
  setPlayoffSeasons,
  setRegularSeasons
} from '../../reducers/gameLogsReducer';
import StatTable from './StatTable';
import CareerFilter from '../CareerFilter';

const GameLogs = ({
  playerId,
  swipeReferences,
  isGoalie,
  playerSeasons,
  playoffGames,
  regularGames,
  setSeasonLogs,
  selectedFilter
}) => {
  const [playoffSelected, setPlayoffSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setSeasonLogs(playerId, selectedFilter);
  }, [playerId, selectedFilter, setSeasonLogs]);

  useEffect(() => {
    if (playoffGames.length === 0) {
      setIsDisabled(true);
      setPlayoffSelected(false);
    } else {
      setIsDisabled(false);
    }
  }, [playoffGames]);

  useEffect(() => {
    swipeReferences.current.updateHeight();
  }, [playoffSelected, swipeReferences]);

  const handleChange = event => {
    setPlayoffSelected(event.target.checked);
  };

  if (isEmpty(regularGames)) {
    return <Typography variant="subtitle1">No NHL Games</Typography>;
  }

  return (
    <div>
      <Typography style={{ paddingTop: '20px' }} variant="h6" id="tableTitle">
        Game Logs
      </Typography>
      <div>
        <CareerFilter
          filterKey="gameLogs"
          swipeReferences={swipeReferences}
          filterNames={playerSeasons}
          buttonTitle={
            selectedFilter.slice(0, 4) + '-' + selectedFilter.slice(4)
          }
        />
        <FormControlLabel
          control={
            <Switch
              checked={playoffSelected}
              onChange={handleChange}
              disabled={isDisabled}
            />
          }
          label="Playoff"
        />
      </div>
      <StatTable
        headCells={
          isGoalie
            ? ['Date', 'Team', 'SA', 'S', 'S%', 'TOI']
            : ['Date', 'Team', 'P', 'G', 'A', 'TOI']
        }
        bodyCells={playoffSelected ? playoffGames : regularGames}
        tableCells={playoffSelected ? playoffGames : regularGames}
      />
    </div>
  );
};

const createData = (
  date,
  against,
  pointsOrSA,
  goalsOrSaves,
  assistsOrSP,
  toi
) => {
  let id = 0;
  id += 1;
  return { id, date, against, pointsOrSA, goalsOrSaves, assistsOrSP, toi };
};

const filterLogs = (isGoalie, games) => {
  if (!isEmpty(games) && isGoalie === 'G' && has(games[0], 'stat.saves')) {
    return games.map(season =>
      createData(
        season.date,
        season.isHome
          ? season.opponent.abbreviation
          : season.opponent.abbreviation.replace(/^/, '@'),
        season.stat.shotsAgainst,
        season.stat.saves,
        season.stat.savePercentage.toFixed(3),
        season.stat.timeOnIce
      )
    );
  } else if (!isEmpty(games)) {
    return games.map(season =>
      createData(
        season.date,
        season.isHome
          ? season.opponent.abbreviation
          : season.opponent.abbreviation.replace(/^/, '@'),
        season.stat.points,
        season.stat.goals,
        season.stat.assists,
        season.stat.timeOnIce
      )
    );
  }
};

const createFilters = allSeasons => [
  ...new Set(
    allSeasons
      .filter(season => season.league.name === 'NHL')
      .map(season => season.season.slice(0, 4) + '-' + season.season.slice(4))
  )
];

const getLastSeason = allSeasons =>
  findLast(allSeasons, season => season.league.name === 'NHL').season;

const mapStateToProps = state => {
  const {
    player: {
      stats: {
        0: { splits }
      }
    },
    player: {
      primaryPosition: { abbreviation: isGoalie }
    }
  } = state;
  return {
    playerId: state.player.id,
    playoffGames: filterLogs(isGoalie, state.gameLogs.playoff) || [],
    regularGames: filterLogs(isGoalie, state.gameLogs.regular) || [],
    playerSeasons: createFilters(splits),
    selectedFilter: state.filter.gameLogs
      ? state.filter.gameLogs.replace('-', '')
      : getLastSeason(splits)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSeasonLogs: (playerId, season) => {
      dispatch(setPlayoffSeasons(playerId, season));
      dispatch(setRegularSeasons(playerId, season));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLogs);
