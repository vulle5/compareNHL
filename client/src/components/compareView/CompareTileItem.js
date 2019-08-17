import React, { Fragment } from "react";

import { startCase } from "lodash";
import { Typography } from "@material-ui/core";

const CompareTileItem = ({ listItems }) => {
  const generateList = () =>
    Object.keys(listItems).map((key, i) => (
      <Fragment key={i}>
        <Typography
          variant="body1"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {startCase(key)}
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          {listItems[key].map((item, i) => (
            <li key={i} style={{ margin: "0 8px 0 8px" }}>{`${item[0]}: ${
              item[1]
            }`}</li>
          ))}
        </ul>
      </Fragment>
    ));

  return <div>{generateList()}</div>;
};

export default CompareTileItem;
