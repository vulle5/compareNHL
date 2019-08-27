import React from "react";
import { startCase } from "lodash";

const AdvancedList = props => {
  const renderContent = () => {
    const {
      seasons: { stat: stats }
    } = props;
    const result = Object.entries(stats);
    return result.map((item, index) => (
      <li key={index}>{`${startCase(item[0])}: ${item[1]}`}</li>
    ));
  };

  return (
    <ul style={{ listStyleType: "none", paddingInlineStart: "0px" }}>
      {renderContent()}
    </ul>
  );
};

export default AdvancedList;
