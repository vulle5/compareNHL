import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEmpty, get } from "lodash";

import { useCompareStyles } from "../../styles/useStyles";
import { initializeCompare, addCompare } from "../../reducers/compareReducer";
import { toggleProgress } from "../../reducers/globalProgressReducer";
import CompareTile from "./CompareTile";
import FAB from "../FAB";
import CompareDialog from "./CompareDialog";
import ErrorMessage from "../ErrorMessage";

const Compare = ({
  match: {
    params: { playerId }
  },
  compare,
  toggleProgress,
  compareCareerRegular,
  initializeCompare,
  addCompare,
  location: { search }
}) => {
  const classes = useCompareStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    initializeCompare(playerId);
  }, [initializeCompare, playerId, search]);

  if (isEmpty(compare)) toggleProgress(true);
  if (!isEmpty(compare)) toggleProgress(false);

  if (compare.errorMessage) {
    return <ErrorMessage />;
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function onOutsideClick() {
    setOpen(false);
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
      <CompareDialog
        open={open}
        onClose={handleClose}
        onOutsideClick={onOutsideClick}
      />
    </div>
  );
};

const getPlayersRegularSeasonStats = compare =>
  compare.map(player => get(player, 'stats[1].splits["0"].stat', null));

const mapStateToProps = state => {
  return {
    compare: state.compare,
    compareCareerRegular:
      !state.compare.errorMessage && getPlayersRegularSeasonStats(state.compare)
  };
};

export default connect(
  mapStateToProps,
  { initializeCompare, addCompare, toggleProgress }
)(Compare);
