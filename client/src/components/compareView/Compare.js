import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { isEmpty } from "lodash";

import { compareStyles } from "../../styles/jss-styles";
import { initializePlayer } from "../../reducers/playerReducer";
import CompareTile from "./CompareTile";

const Compare = ({
  match: {
    params: { playerId }
  },
  player,
  initializePlayer
}) => {
  useEffect(() => {
    initializePlayer(playerId);
  }, [initializePlayer, playerId]);

  if (isEmpty(player)) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: "16px" }}>
      <CompareTile />
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    player: state.player
  };
};

export default connect(
  mapStateToProps,
  { initializePlayer }
)(withStyles(compareStyles)(Compare));
