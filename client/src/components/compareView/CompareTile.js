import React from "react";
import { connect } from "react-redux";

import { Paper, Typography, Avatar, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { removeCompare } from "../../reducers/compareReducer";

// TODO: handle players without NHL games properly

const CompareTile = ({
  player,
  removeCompare,
  compare,
  compareCareerRegular
}) => {
  return (
    <Paper
      style={{
        display: "inline-block",
        margin: "16px 16px 0px 0px"
      }}
    >
      {compare.length > 1 && (
        <IconButton
          style={{ float: "right" }}
          onClick={() => removeCompare(player.id)}
        >
          <ClearIcon />
        </IconButton>
      )}
      <div style={{ padding: "16px" }}>
        <Avatar
          alt="Player"
          src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
            player.id
          }.jpg`}
          style={{
            width: "100px",
            height: "100px",
            margin: "12px auto",
            WebkitBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
            MozBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
            boxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
            border: "lightgray",
            borderStyle: "inset",
            borderWidth: "1px"
          }}
        />
        <Typography
          variant="h6"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {player.fullName}
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
          <li style={{ margin: "0 8px 0 8px" }}>{`Age: ${
            player.currentAge
          }`}</li>
        </ul>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Career
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <li style={{ margin: "0 8px 0 8px" }}>{`GP: ${
            compareCareerRegular.games
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`P: ${
            compareCareerRegular.points
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`G: ${
            compareCareerRegular.goals
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`A: ${
            compareCareerRegular.assists
          }`}</li>
        </ul>
        <Typography
          variant="body1"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          Shooting
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <li style={{ margin: "0 8px 0 8px" }}>{`Shots: ${
            compareCareerRegular.shots
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Shot%: ${
            compareCareerRegular.shotPct
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Blocks: ${
            compareCareerRegular.blocked
          }`}</li>
        </ul>
        <Typography
          variant="body1"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          Even Strength
        </Typography>
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
          >{`P: ${compareCareerRegular.points -
            compareCareerRegular.powerPlayPoints -
            compareCareerRegular.shortHandedPoints}`}</li>
          <li
            style={{ margin: "0 8px 0 8px" }}
          >{`G: ${compareCareerRegular.goals -
            compareCareerRegular.powerPlayGoals -
            compareCareerRegular.shortHandedGoals}`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`TOI: ${
            compareCareerRegular.evenTimeOnIce
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`TOI/GP: ${
            compareCareerRegular.evenTimeOnIcePerGame
          }`}</li>
        </ul>
        <Typography
          variant="body1"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          Power Play
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <li style={{ margin: "0 8px 0 8px" }}>{`P: ${
            compareCareerRegular.powerPlayPoints
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`G: ${
            compareCareerRegular.powerPlayGoals
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`TOI: ${
            compareCareerRegular.powerPlayTimeOnIce
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`TOI/GP: ${
            compareCareerRegular.powerPlayTimeOnIcePerGame
          }`}</li>
        </ul>
        <Typography
          variant="body1"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          Short Handed
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <li style={{ margin: "0 8px 0 8px" }}>{`P: ${
            compareCareerRegular.shortHandedPoints
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`G: ${
            compareCareerRegular.shortHandedGoals
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`TOI: ${
            compareCareerRegular.shortHandedTimeOnIce
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`TOI/GP: ${
            compareCareerRegular.shortHandedTimeOnIcePerGame
          }`}</li>
        </ul>
      </div>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    compare: state.compare
  };
};

export default connect(
  mapStateToProps,
  { removeCompare }
)(CompareTile);
