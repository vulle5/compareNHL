import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { isEmpty, get } from "lodash";

import { useCompareStyles } from "../../styles/useStyles";
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
  const classes = useCompareStyles();
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
    <div className={classes.divRoot}>
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

const getPlayersRegularSeasonStats = compare => compare.map(
  player => 
    get(player, 'stats[1].splits["0"].stat', null)
)

const mapStateToProps = state => {
  console.log(state);
  return {
    compare: state.compare,
    compareCareerRegular: getPlayersRegularSeasonStats(state.compare)
  };
};

export default connect(
  mapStateToProps,
  { initializeCompare, addCompare }
)(Compare);
