import React from "react";
import { connect } from "react-redux";

import { Paper, Typography, Avatar, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { removeCompare } from "../../reducers/compareReducer";
import { useCompareStyles } from "../../styles/useStyles";
import CompareTileItem from "./CompareTileItem";

// TODO: handle players without NHL games properly
// TODO: change list tiles to array of objects [{ shooting: [["GP", compareCareerRegular.goals]...]... }] 

const CompareTile = ({
  player,
  removeCompare,
  compare,
  compareCareerRegular
}) => {
  const listTitles = [
    "Shooting",
    "Even Strength",
    "Power Play",
    "Short Handed",
    "Other"
  ];
  const listItems = [
    [
      ["GP", compareCareerRegular.goals],
      ["P", compareCareerRegular.points],
      ["G", compareCareerRegular.goals],
      ["A", compareCareerRegular.assists]
    ],
    [
      ["Shots", compareCareerRegular.shots],
      ["Shot%", compareCareerRegular.shotPct],
      ["Blocks", compareCareerRegular.blocked]
    ]
  ];
  const classes = useCompareStyles();

  return (
    <Paper className={classes.tileRoot}>
      {compare.length > 1 && (
        <IconButton
          className={classes.tileCloseButton}
          onClick={() => removeCompare(player.id)}
        >
          <ClearIcon />
        </IconButton>
      )}
      <div className={classes.tileWrapper}>
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
          <li style={{ margin: "0 8px 0 8px" }}>{`Age: ${
            player.currentAge
          }`}</li>
        </ul>
        <CompareTileItem listTitles={listTitles} listItems={listItems} />
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
