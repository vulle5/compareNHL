import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { compareStyles } from "../../styles/jss-styles";

const Compare = ({ match: { params }, classes, player }) => {
  console.log(player);
  return <Typography variant="h3">{player.currentTeam.name}</Typography>;
};

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(compareStyles)(Compare));
