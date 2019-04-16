import React from "react";

const AdvancedList = ({ seasons: { stat: stats } }) => {

  const renderContent = () => {
    let result = Object.entries(stats);
    return result.map((item, index) => (
      <li key={index}>{`${item[0]}: ${item[1]}`}</li>
    ));
	}

  return (
    <ul style={{listStyleType: "none", paddingInlineStart: "0px"}}>
      {renderContent()}
    </ul>
  );
}

export default AdvancedList