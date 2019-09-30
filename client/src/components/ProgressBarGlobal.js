import React from 'react';
import { connect } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { LinearProgress } from '@material-ui/core';

const ProgressBarGlobal = ({ showProgress }) => {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));
  return (
    <div
      style={{
        top: matches ? '64px' : '56px',
        position: 'absolute',
        width: '100%'
      }}
    >
      <LinearProgress
        color="secondary"
        hidden={!showProgress}
        style={{ height: '2px' }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showProgress: state.globalProgress
  };
};

export default connect(mapStateToProps)(ProgressBarGlobal);
