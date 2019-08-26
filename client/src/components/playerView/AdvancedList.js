import React from "react";
import { startCase } from "lodash";
import { Typography } from "@material-ui/core";

const AdvancedList = props => {
  const renderContent = () => {
    if (props.seasons) {
      const {
        seasons: { stat: stats }
      } = props;
      const result = Object.entries(stats);
      return result.map((item, index) => (
        <li key={index}>{`${startCase(item[0])}: ${item[1]}`}</li>
      ));
    } else {
      return <Typography variant="subtitle1">No NHL Stats</Typography>;
    }
  };

  return (
    <ul style={{ listStyleType: "none", paddingInlineStart: "0px" }}>
      {renderContent()}
    </ul>
  );
};

export default AdvancedList;
