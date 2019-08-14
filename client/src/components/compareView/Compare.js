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
  compareCareerRegular,
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
    <div style={{ padding: "0px 16px 16px 16px" }}>
      {compare.map((player, i) => (
        <CompareTile
          key={player.id}
          player={player}
          compareCareerRegular={compareCareerRegular[i]}
        />
      ))}
      <FAB title="Add Player" onClick={handleClickOpen} />
      <CompareDialog open={open} onClose={handleClose} />
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    compare: state.compare,
    compareCareerRegular: state.compare.reduce(
      (acc, player) => [...acc, { ...player.stats[1].splits["0"].stat }],
      []
    )
  };
};

export default connect(
  mapStateToProps,
  { initializeCompare, addCompare }
)(withStyles(compareStyles)(Compare));
