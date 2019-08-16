import React from "react";

import { Typography } from "@material-ui/core";

const CompareTileItem = ({ listTitles, listItems }) => {
  const generateList = () =>
    listTitles.map(title => (
      <>
        <Typography
          variant="body1"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          {/* {<li style={{ margin: "0 8px 0 8px" }}>{`${item[0]}: ${item[1]}`}</li>} */}
        </ul>
      </>
    ));

  return <div>{generateList()}</div>;
};

export default CompareTileItem;
