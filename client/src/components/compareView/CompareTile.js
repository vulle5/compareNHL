import React from "react";
import { connect } from "react-redux";
import { find } from "lodash";
import { Paper, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { removeCompare } from "../../reducers/compareReducer";
import { useCompareStyles } from "../../styles/useStyles";
import { makeCompareData } from "../../functions/makeCompareData";
import CompareTileItem from "./CompareTileItem";
import CompareTileHeader from "./CompareTileHeader";
import DisplayFilter from "../DisplayFilter";
import CareerFilter from "../CareerFilter";

const CompareTile = ({
  player,
  removeCompare,
  compare,
  compareCareerRegular,
  playerSeasons
}) => {
  const listItems = compareCareerRegular
    ? makeCompareData(compareCareerRegular)
    : null;
  const classes = useCompareStyles();
  return (
    <Paper className={classes.tileRoot}>
      {compare.length > 1 && (
        <IconButton
          className={classes.tileCloseButton}
          onClick={() => removeCompare(player.id)}
        >
          <ClearIcon />
        </IconButton>
      )}
      <div className={classes.tileWrapper}>
        <CompareTileHeader player={player} />
        <div style={{ textAlign: "center" }}>
          <CareerFilter filterKey="compareTile" filterNames={playerSeasons} />
          <DisplayFilter />
        </div>
        {listItems ? (
          <CompareTileItem listItems={listItems} />
        ) : (
          <div style={{ textAlign: "center" }}>No NHL games played</div>
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
        .filter(season => season.league.name === "NHL")
        .map(season => season.season.slice(0, 4) + "-" + season.season.slice(4))
    )
    .flat();

const getSelectedSeason = (allSeasons, selectedFilter) =>
  find(allSeasons.filter(season => season.league.name === "NHL"), {
    season: selectedFilter
  });

const mapStateToProps = (state, ownProps) => {
  const { compare } = state;
  const { player } = ownProps;
  return {
    compare,
    // filteredSeasons: getSelectedSeason()
    playerSeasons: createFilters(compare, player.id)
  };
};

export default connect(
  mapStateToProps,
  { removeCompare }
)(CompareTile);
