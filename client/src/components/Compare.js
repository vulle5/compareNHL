import React, { Fragment, useState } from "react";
import typy from "typy";
import { Paper, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compareStyles } from "../styles/jss-styles";
import { genPlayer } from "../functions/genPlayer";
import { useGetPlayerInfo } from "../functions/useGetPlayerInfo";
import FloatingActionButton from "../components/FloatingActionButton";
import SearchResultsList from "../components/SearchResultsList";

const Compare = ({ match: { params }, classes }) => {
  const playerInfo = useGetPlayerInfo(
    params.playerId,
    "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team"
  );

  const [listStatus, setListStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const renderSearch = () => {
    return(
      <Fragment>
        <TextField
          id="outlined-name"
          label="Name"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          margin="normal"
          variant="outlined"
        />
        <SearchResultsList listStatus={listStatus} handleListStatus={bool => setListStatus(bool)} />
      </Fragment>
    );
  }

  const renderContent = player => {
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">{player.fullName}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderSearch()}
        </Paper>
        <FloatingActionButton title="Add Player" onClick={() => setListStatus(true)} />
      </Fragment>
    );
  };

  let id = 0;
  function createData(name, data) {
    id += 1;
    return { id, name, data };
  }

  let rows = [];
  let content;

  if (typy(playerInfo, "people[0]").safeObject) {
    const player = genPlayer(typy(playerInfo, "people[0]").safeObject);
    console.log(player);
    rows = [
      createData('Age', player.calcCurrentAge()),
      createData('Hight', player.metricHight),
      createData('Weight', player.metricWeight),
      createData('Nationality', player.nationality),
      createData('Birth City', player.birthCity),
      createData('Position', player.primaryPosition.name),
    ];
    content = renderContent(player);
  } else {
    content = <CircularProgress />;
  }

  return <div className={classes.root}>{content}</div>;
};

export default withStyles(compareStyles)(Compare);
