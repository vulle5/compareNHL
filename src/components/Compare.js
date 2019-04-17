import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    overflow: 'auto',
    whiteSpace: 'nowrap'
  },
  wrapper: {
    flexGrow: 1,
  },
  paper: {
    height: 750,
    width: 400,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const Compare = props => {
  console.log(props);
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid
      container
      style={{padding: '8px'}}
      direction="row"
      justify="flex-start"
      className={classes.wrapper}
      >
        <Grid item xs={12} >
          <Grid container className={classes.demo} spacing={16}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Compare);