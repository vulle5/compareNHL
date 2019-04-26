import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// import { getPlayerInfo } from "../functions/getPlayerInfo";

const styles = theme => ({
  list: {
    listStyleType: "none",
    paddingInlineStart: "0px"
  }
});

const Compare = ({ match: { params }, classes }) => {
  // const playerInfo = getPlayerInfo(params.playerId, "");

  return (
    <div style={{ textAlign: "center" }}>
      <Paper style={{}}>
        <div>
          <Typography variant="h5">Sebastian Aho</Typography>
          <Typography variant="body1" component="ul" className={classes.list}>
            <li>Basic stats</li>
            <li>Points</li>
            <li>Goals</li>
            <li>Assists</li>
          </Typography>
        </div>
        <div>
          <Typography variant="h5">Patrik Laine</Typography>
          <Typography variant="body1" component="ul" className={classes.list}>
            <li>Basic stats</li>
            <li>Points</li>
            <li>Goals</li>
            <li>Assists</li>
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Compare);
