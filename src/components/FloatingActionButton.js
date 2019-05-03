import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { floatingActionButtonStyles } from '../styles/jss-styles';

const FloatingActionButton = ({ classes, width, to, title }) => {
  return (
    <div className={classes.root}>
      <Fab
        variant={isWidthUp('sm', width) ? 'extended' : null}
        aria-label="Add to Compare"
        className={classes.fab}
        color="primary"
        component={Link}
        to={to}
      >
        <AddIcon className={isWidthUp('sm', width) ? classes.extendedIcon : null} />
        {isWidthUp('sm', width) ? title : null}
      </Fab>
    </div>
  );
};

export default withWidth()(withStyles(floatingActionButtonStyles)(FloatingActionButton));