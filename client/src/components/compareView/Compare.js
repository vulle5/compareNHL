import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { isEmpty } from "lodash";

import { compareStyles } from "../../styles/jss-styles";
import { initializeCompare } from "../../reducers/compareReducer";
import CompareTile from "./CompareTile";

const Compare = ({
  match: {
    params: { playerId }
  },
  compare,
  initializeCompare
}) => {
  useEffect(() => {
    initializeCompare(playerId);
  }, [initializeCompare, playerId]);

  if (isEmpty(compare)) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: "16px" }}>
      {compare.map(player => (
        <CompareTile key={player.id} player={player} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    compare: state.compare
  };
};

export default connect(
  mapStateToProps,
  { initializeCompare }
)(withStyles(compareStyles)(Compare));
