import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  list: {
    listStyleType: "none",
    paddingInlineStart: "0px",
  },
  listItem: {
  }
});

const CompareTile = ({ classes, playerName }) => {
  return (
    <div style={{ margin: "16px" }}>
      <Typography variant="h5">{playerName}</Typography>
      <Typography variant="subtitle1" component="ul" className={classes.list}>
        <li className={classes.listItem}>Games Played</li>
        <li className={classes.listItem}>Points</li>
        <li className={classes.listItem}>Goals</li>
        <li className={classes.listItem}>Assists</li>
      </Typography>
    </div>
  );
}

export default withStyles(styles)(CompareTile);