import React from "react";
import { Typography } from "@material-ui/core";

import ScheduleDayItem from "./ScheduleDayItem";

const ScheduleDayList = () => {
  return (
    <div>
      <Typography variant="h4">Today</Typography>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <ScheduleDayItem home="CAR" away="FLA" scoreOrTime="0-0" />
        <ScheduleDayItem home="CHI" away="CAP" scoreOrTime="20:00" />
      </div>
    </div>
  );
};

export default ScheduleDayList;
