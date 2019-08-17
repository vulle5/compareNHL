import React from "react";
import { connect } from "react-redux";
import { Paper, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { removeCompare } from "../../reducers/compareReducer";
import { useCompareStyles } from "../../styles/useStyles";
import CompareTileItem from "./CompareTileItem";
import CompareTileHeader from "./CompareTileHeader";

const CompareTile = ({
  player,
  removeCompare,
  compare,
  compareCareerRegular
}) => {
  const listItems = compareCareerRegular
    ? {
        general: [
          ["GP", compareCareerRegular.games],
          ["P", compareCareerRegular.points],
          ["G", compareCareerRegular.goals],
          ["A", compareCareerRegular.assists]
        ],
        shooting: [
          ["Shots", compareCareerRegular.shots],
          ["Shot%", compareCareerRegular.shotPct],
          ["Blocks", compareCareerRegular.blocked]
        ],
        evenStrength: [
          ["G", compareCareerRegular.goals],
          ["P", compareCareerRegular.points],
          ["TOI", compareCareerRegular.evenTimeOnIce],
          ["TOI/GP", compareCareerRegular.evenTimeOnIcePerGame]
        ],
        powerPlay: [
          ["G", compareCareerRegular.powerPlayGoals],
          ["P", compareCareerRegular.powerPlayPoints],
          ["TOI", compareCareerRegular.powerPlayTimeOnIce],
          ["TOI/GP", compareCareerRegular.powerPlayTimeOnIcePerGame]
        ],
        shortHanded: [
          ["G", compareCareerRegular.shortHandedGoals],
          ["P", compareCareerRegular.shortHandedPoints],
          ["TOI", compareCareerRegular.shortHandedTimeOnIce],
          ["TOI/GP", compareCareerRegular.shortHandedTimeOnIcePerGame]
        ],
        other: [
          ["PIM", compareCareerRegular.pim],
          ["Hits", compareCareerRegular.hits],
          ["+/-", compareCareerRegular.plusMinus],
          ["FO%", compareCareerRegular.faceOffPct]
        ]
      }
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
