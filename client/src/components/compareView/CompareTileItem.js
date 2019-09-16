import React, { Fragment } from 'react';
import { startCase } from 'lodash';
import { Typography } from '@material-ui/core';

import { useCompareStyles } from '../../styles/useStyles';

const CompareTileItem = ({ listItems }) => {
  const classes = useCompareStyles();

  const generateList = () =>
    Object.keys(listItems).map((key, i) => (
      <Fragment key={i}>
        <Typography variant="body1" className={classes.tileTitle}>
          {startCase(key)}
        </Typography>
        <ul className={classes.tileList}>
          {listItems[key].map((item, i) => (
            <li key={i} className={classes.tileListItem}>{`${item[0]}: ${
              item[1]
            }`}</li>
          ))}
        </ul>
      </Fragment>
    ));

  return <div>{generateList()}</div>;
};

export default CompareTileItem;
