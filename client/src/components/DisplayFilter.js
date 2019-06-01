import React from "react";
import Typography from "@material-ui/core/Typography";

const DisplayFilter = ({ selectedFilter, style }) => {
  return (
    <Typography style={style || null} variant="subtitle1" id="tableSelected">
      {selectedFilter}
    </Typography>
  );
};

export default DisplayFilter;
