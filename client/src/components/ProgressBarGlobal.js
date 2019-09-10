import React from "react";
import { connect } from "react-redux";

import { LinearProgress } from "@material-ui/core";

const ProgressBarGlobal = ({ showProgress }) => {
  return (
    <div style={{ position: "absolute", width: "100%" }}>
      <LinearProgress
        color="secondary"
        hidden={!showProgress}
        style={{ height: "2px" }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showProgress: state.globalProgress
  };
};

export default connect(mapStateToProps)(ProgressBarGlobal);