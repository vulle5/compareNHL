import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useCompareStyles } from "../../styles/useStyles";

const CompareTileHeader = ({ player }) => {
  const classes = useCompareStyles();

  return (
    <div>
      <Link to={`/player/${player.id}`}>
        <Avatar
          alt="Player"
          src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`}
          className={classes.tileAvatar}
        />
      </Link>
      <div style={{ textAlign: "center" }}>
        <Link to={`/player/${player.id}`}>
          <Typography
            variant="h6"
            style={{ display: "inline-block", fontWeight: "bold" }}
          >
            {`${player.fullName} #${player.primaryNumber}`}
          </Typography>
        </Link>
      </div>
      <div className={classes.bannerWrapper}>
        {player.currentTeam.id !== "N/A" && (
          <img
            height="35"
            src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-dark/${player.currentTeam.id}.svg`}
            alt="team"
          />
        )}
        <Typography
          variant="subtitle2"
          style={{ alignSelf: "center", fontWeight: "bold" }}
        >
          {player.currentTeam.name}
        </Typography>
      </div>
      <ul
        style={{
          listStyleType: "none",
          paddingInlineStart: "0px",
          display: "flex",
          justifyContent: "space-evenly"
        }}
      >
        <li
          style={{ margin: "0 8px 0 8px" }}
        >{`Pos: ${player.primaryPosition.abbreviation}`}</li>
        <li
          style={{ margin: "0 8px 0 8px" }}
        >{`${player.height}, ${player.metricHeight} cm`}</li>
        <li
          style={{ margin: "0 8px 0 8px" }}
        >{`${player.weight} lbs, ${player.metricWeight} kg`}</li>
        <li style={{ margin: "0 8px 0 8px" }}>{`Age: ${player.currentAge}`}</li>
      </ul>
    </div>
  );
};

export default CompareTileHeader;
