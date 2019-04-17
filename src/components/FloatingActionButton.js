import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { floatingActionButtonStyles } from '../styles/jss-styles';

const FloatingActionButton = ({ classes, width, playerId }) => {
  return (
    <div className={classes.root}>
      <Fab
        variant={isWidthUp('sm', width) ? 'extended' : null}
        aria-label="Add to Compare"
        className={classes.fab}
        color="primary"
        component={Link}
        to={`/compare/${playerId}`}
      >
        <AddIcon className={isWidthUp('sm', width) ? classes.extendedIcon : null} />
        {isWidthUp('sm', width) ? 'Compare' : null}
      </Fab>
    </div>
  );
};

export default withWidth()(withStyles(floatingActionButtonStyles)(FloatingActionButton));