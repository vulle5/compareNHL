import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { isEmpty } from "lodash";

import { compareStyles } from "../../styles/jss-styles";
import { initializeCompare } from "../../reducers/compareReducer";
import CompareTile from "./CompareTile";
import FAB from "../FAB";
import CompareDialog from "../CompareDialog";

const Compare = ({
  match: {
    params: { playerId }
  },
  compare,
  initializeCompare
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([
    "Hello",
    "Not Hello"
  ]);

  useEffect(() => {
    initializeCompare(playerId);
  }, [initializeCompare, playerId]);

  if (isEmpty(compare)) {
    return <CircularProgress />;
  }

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div style={{ padding: "16px" }}>
      {compare.map(player => (
        <CompareTile key={player.id} player={player} />
      ))}
      <FAB title="Add Player" onClick={handleClickOpen} />
      <CompareDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
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
