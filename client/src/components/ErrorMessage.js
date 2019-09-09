import React from "react";
import { Typography } from "@material-ui/core";

import image from "../assets/notFound.png";

const ErrorMessage = () => {
  return (
    <div style={{ margin: "16px" }}>
      <img style={{ maxWidth: "100%" }} src={image} alt="Error" />
      <Typography style={{ padding: "16px", textAlign: "center" }} variant="h5">
        There is nothing to see here search players from search bar at upper
        right corner
      </Typography>
    </div>
  );
};

export default ErrorMessage;
