import React from "react";
import { Typography, Avatar } from "@material-ui/core";

import { useCompareStyles } from "../../styles/useStyles";

const CompareTileHeader = ({ player }) => {
  const classes = useCompareStyles();

  return (
    <>
      <Avatar
        alt="Player"
        src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
          player.id
        }.jpg`}
        className={classes.tileAvatar}
      />
      <Typography
        variant="h6"
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        {`${player.fullName} #${player.primaryNumber}`}
      </Typography>
      <Typography
        variant="subtitle2"
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        {player.currentTeam.name}
      </Typography>
      <ul
        style={{
          listStyleType: "none",
          paddingInlineStart: "0px",
          display: "flex",
          justifyContent: "space-evenly"
        }}
      >
        <li style={{ margin: "0 8px 0 8px" }}>{`Pos: ${
          player.primaryPosition.abbreviation
        }`}</li>
        <li style={{ margin: "0 8px 0 8px" }}>{`${player.height}, ${
          player.metricHeight
        } cm`}</li>
        <li style={{ margin: "0 8px 0 8px" }}>{`${player.weight}lbs, ${
          player.metricWeight
        }kg`}</li>
        <li style={{ margin: "0 8px 0 8px" }}>{`Age: ${player.currentAge}`}</li>
      </ul>
    </>
  );
};

export default CompareTileHeader;
