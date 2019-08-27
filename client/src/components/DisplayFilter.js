import React from "react";
import Typography from "@material-ui/core/Typography";

const DisplayFilter = ({ selectedFilter, style, variant }) => {
  return (
    <Typography
      style={style || null}
      variant={variant && variant}
      id="tableSelected"
    >
      {selectedFilter}
    </Typography>
  );
};

export default DisplayFilter;
