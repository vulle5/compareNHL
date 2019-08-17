import React from "react";
import { connect } from "react-redux";
import { Paper, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { removeCompare } from "../../reducers/compareReducer";
import { useCompareStyles } from "../../styles/useStyles";
import { makeCompareData } from "../../functions/makeCompareData";
import CompareTileItem from "./CompareTileItem";
import CompareTileHeader from "./CompareTileHeader";

const CompareTile = ({
  player,
  removeCompare,
  compare,
  compareCareerRegular
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
        {listItems ? (
          <CompareTileItem listItems={listItems} />
        ) : (
          <div style={{ textAlign: "center" }}>No NHL games played</div>
        )}
      </div>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    compare: state.compare
  };
};

export default connect(
  mapStateToProps,
  { removeCompare }
)(CompareTile);
