import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { seasonTableStyles } from '../../styles/jss-styles';
import StatTable from './StatTable';
import CareerFilter from '../CareerFilter';

const CareerTable = props => {
  const {
    classes,
    swipeReferences,
    isGoalie,
    currentFilter,
    filteredStats,
    playerLeagues
  } = props;

  return (
    <div className={classes.root}>
      <Typography style={{ paddingTop: '20px' }} variant="h6" id="tableTitle">
        Career
      </Typography>
      <CareerFilter
        filterNames={playerLeagues}
        filterKey={'careerTable'}
        swipeReferences={swipeReferences}
        buttonTitle={currentFilter.length === 0 ? 'Show All' : currentFilter}
        eraseFilter="Show All"
      />
      <StatTable
        headCells={
          isGoalie
            ? ['League', 'Team', 'Season', 'GP', 'W', 'L', 'GAA']
            : ['League', 'Team', 'Season', 'GP', 'P', 'G', 'A']
        }
        bodyCells={filteredStats}
        tableCells={filteredStats}
      />
    </div>
  );
};

const createData = (
  name,
  team,
  season,
  games,
  pointsOrWins,
  goalsOrLosses,
  assistsOrGAA
) => {
  let id = 0;
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

const filterSeasons = (player, filter) => {
  const {
    stats: {
      0: { splits }
    },
    primaryPosition: { abbreviation: isGoalie }
  } = player;

  return [
    ...splits
      .map(season =>
        createData(
          season.league.name,
          season.league.name === 'NHL'
            ? season.team.abbreviation
            : season.team.name,
          season.season.slice(0, 4) + '-' + season.season.slice(4),
          season.stat.games,
          isGoalie === 'G' ? season.stat.wins : season.stat.points,
          isGoalie === 'G' ? season.stat.losses : season.stat.goals,
          isGoalie === 'G'
            ? typeof season.stat.goalAgainstAverage === 'number'
              ? parseFloat(season.stat.goalAgainstAverage).toFixed(2)
              : ''
            : season.stat.assists
        )
      )
      .filter(season => (filter.length !== 0 ? season.name === filter : true))
  ].reverse();
};

const mapStateToProps = state => {
  const filter = state.filter.careerTable || '';
  return {
    currentFilter: filter,
    filteredStats: filterSeasons(state.player, filter),
    playerLeagues: [
      ...new Set(filterSeasons(state.player, '').map(object => object.name))
    ]
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(seasonTableStyles)(CareerTable));
