import React from "react";
import { connect } from "react-redux";

import { Paper, Typography, Avatar, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { removeCompare } from "../../reducers/compareReducer";

const CompareTile = ({ player, removeCompare, compare }) => {
  return (
    <Paper
      style={{
        display: "inline-block",
        margin: "0px 16px 0px 0px"
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
            margin: "12px 0 12px 30%",
            WebkitBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
            MozBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
            boxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
            border: "lightgray",
            borderStyle: "inset",
            borderWidth: "1px"
          }}
        />
        <Typography
          variant="body1"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {player.fullName}
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex"
          }}
        >
          <li style={{ margin: "0 8px 0 8px" }}>{`Height: ${
            player.height
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Weight: ${
            player.metricWeight
          }`}</li>
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
            display: "flex"
          }}
        >
          <li style={{ margin: "0 8px 0 8px" }}>{`Height: ${
            player.height
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Weight: ${
            player.metricWeight
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Age: ${
            player.currentAge
          }`}</li>
        </ul>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          2018-2019
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex"
          }}
        >
          <li style={{ margin: "0 8px 0 8px" }}>{`Height: ${
            player.height
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Weight: ${
            player.metricWeight
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Age: ${
            player.currentAge
          }`}</li>
        </ul>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Advanced
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            display: "flex"
          }}
        >
          <li style={{ margin: "0 8px 0 8px" }}>{`Height: ${
            player.height
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Weight: ${
            player.metricWeight
          }`}</li>
          <li style={{ margin: "0 8px 0 8px" }}>{`Age: ${
            player.currentAge
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
