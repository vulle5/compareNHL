import React from 'react';
import { connect } from 'react-redux';
import { Paper, IconButton, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { removeCompare } from '../../reducers/compareReducer';
import { useCompareStyles } from '../../styles/useStyles';
import { makeCompareData } from '../../functions/makeCompareData';
import CompareTileItem from './CompareTileItem';
import CompareTileHeader from './CompareTileHeader';
import CareerFilter from '../CareerFilter';

const CompareTile = ({
  player,
  removeCompare,
  compare,
  compareCareerRegular,
  playerSeasons,
  filteredSeasons,
  selectedFilter
}) => {
  const listItems = filteredSeasons
    ? makeCompareData(filteredSeasons.stat)
    : makeCompareData(compareCareerRegular);
  const classes = useCompareStyles();

  return (
    <Paper className={classes.tileRoot}>
      {compare.length > 1 && (
        <div className={classes.tileCloseButtonWrapper}>
          <IconButton
            className={classes.tileCloseButton}
            onClick={() => removeCompare(player.id)}
          >
            <ClearIcon />
          </IconButton>
        </div>
      )}
      <div className={classes.tileWrapper}>
        <CompareTileHeader player={player} />
        {listItems ? (
          <>
            <div style={{ textAlign: 'center' }}>
              <CareerFilter
                filterKey={player.id}
                filterNames={playerSeasons}
                eraseFilter="Career"
                buttonTitle={selectedFilter}
              />
            </div>
            <CompareTileItem listItems={listItems} />
          </>
        ) : (
          <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
            No NHL games played
          </Typography>
        )}
      </div>
    </Paper>
  );
};

const createFilters = (compare, id) =>
  compare
    .filter(player => player.id === id)
    .map(({ stats: { 0: { splits } } }) =>
      splits
        .filter(season => season.league.name === 'NHL')
        .map(season => season.season.slice(0, 4) + '-' + season.season.slice(4))
    )
    .reduce((acc, val) => acc.concat(val), []);

const getSelectedSeason = (allSeasons, selectedFilter) =>
  allSeasons.find(
    season => season.league.name === 'NHL' && season.season === selectedFilter
  );

const mapStateToProps = (state, ownProps) => {
  const { compare } = state;
  const {
    player: {
      stats: {
        0: { splits }
      }
    },
    player
  } = ownProps;
  const selectedFilter =
    state.filter[player.id] && state.filter[player.id].length !== 0
      ? state.filter[player.id].replace('-', '')
      : 'NHL Career';
  return {
    compare,
    selectedFilter:
      selectedFilter !== 'NHL Career'
        ? selectedFilter.slice(0, 4) + '-' + selectedFilter.slice(4)
        : selectedFilter,
    filteredSeasons: selectedFilter
      ? getSelectedSeason(splits, selectedFilter)
      : null,
    playerSeasons: createFilters(compare, player.id)
  };
};

export default connect(
  mapStateToProps,
  { removeCompare }
)(CompareTile);
