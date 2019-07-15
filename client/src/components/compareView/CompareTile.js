import React from "react";
import { connect } from "react-redux";

import { Paper, Typography, Avatar } from "@material-ui/core";

const CompareTile = ({ player }) => {
  return (
    <Paper style={{ display: "inline-block", padding: "16px" }}>
      <Avatar
        alt="Player"
        src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${
          player.id
        }.jpg`}
        style={{
          width: "100px",
          height: "100px",
          margin: "12px auto 12px auto",
          WebkitBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
          MozBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
          boxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
          border: "lightgray",
          borderStyle: "inset",
          borderWidth: "1px"
        }}
      />
      <Typography variant="body1">{player.fullName}</Typography>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

export default connect(mapStateToProps)(CompareTile);
