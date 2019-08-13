import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { isEmpty } from "lodash";

import { compareStyles } from "../../styles/jss-styles";
import { initializeCompare, addCompare } from "../../reducers/compareReducer";
import CompareTile from "./CompareTile";
import FAB from "../FAB";
import CompareDialog from "./CompareDialog";

const Compare = ({
  match: {
    params: { playerId }
  },
  compare,
  initializeCompare,
  addCompare
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    initializeCompare(playerId);
  }, [initializeCompare, playerId]);

  if (isEmpty(compare)) {
    return <CircularProgress />;
  }

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = playerId => {
    setOpen(false);
    addCompare(playerId);
  };

  return (
    <div style={{ padding: "16px" }}>
      {compare.map(player => (
        <CompareTile key={player.id} player={player} />
      ))}
      <FAB title="Add Player" onClick={handleClickOpen} />
      <CompareDialog open={open} onClose={handleClose} />
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
  { initializeCompare, addCompare }
)(withStyles(compareStyles)(Compare));
