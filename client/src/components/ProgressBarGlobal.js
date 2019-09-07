import React from "react";

import { LinearProgress } from "@material-ui/core";

const ProgressBarGlobal = () => {
  return (
    <div style={{ position: "absolute", width: "100%" }}>
      <LinearProgress color="secondary" style={{ height: "2px" }} />
    </div>
  );
};

export default ProgressBarGlobal;
