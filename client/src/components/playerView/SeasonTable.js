import React, { Fragment } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { seasonTableStyles } from "../../styles/jss-styles";
import SeasonTabs from "./SeasonTabs";

const SeasonTable = props => {
  const { classes, width, player, isGoalie } = props;
  const renderContent = () => {
    // Check if player has NHL stats at all
    if (get(player, "stats[1].splits[0].stat")) {
      const {
        player: {
          stats: {
            1: {
              splits: {
                0: { stat: allTime }
              }
            }
          }
        }
      } = props;

      return (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {isWidthUp("sm", width) ? "Games Played" : "GP"}
              </TableCell>
              <TableCell align="center">
                {isGoalie ? "Wins" : "Points"}
              </TableCell>
              <TableCell align="center">
                {isGoalie ? "Save%" : "Goals"}
              </TableCell>
              <TableCell align="center">
                {isGoalie ? "GAA" : "Assists"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" className={classes.rowItem}>
                {allTime.games || "0"}
              </TableCell>
              <TableCell align="center" className={classes.rowItem}>
                {isGoalie ? allTime.wins : allTime.points || "0"}
              </TableCell>
              <TableCell align="center" className={classes.rowItem}>
                {isGoalie
                  ? get(allTime, "savePercentage", 0).toFixed(3)
                  : allTime.goals || "0"}
              </TableCell>
              <TableCell align="center" className={classes.rowItem}>
                {isGoalie
                  ? get(allTime, "goalAgainstAverage", 0).toFixed(2)
                  : allTime.assists || "0"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    } else {
      return (
        <Typography variant="body1" style={{ padding: "8px" }}>
          {player.fullName} does not have any NHL stats
        </Typography>
      );
    }
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography style={{ paddingTop: "20px" }} variant="h6" id="tableTitle">
          NHL Career
        </Typography>
        {renderContent()}
      </div>
      <SeasonTabs />
    </Fragment>
  );
};

const mapStateToProps = state => {
  const {
    primaryPosition: { abbreviation }
  } = state.player;
  return {
    player: state.player,
    isGoalie: abbreviation === "G" && true
  };
};

export default connect(
  mapStateToProps,
  null
)(withWidth()(withStyles(seasonTableStyles)(SeasonTable)));
