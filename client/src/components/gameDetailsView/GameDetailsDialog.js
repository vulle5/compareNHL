import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { toggleDialog } from '../../reducers/dialogReducer';

const GameDetailsDialog = ({ open, src, toggleDialog }) => {
  const handleClose = () => {
    toggleDialog(false, '');
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Highlights</DialogTitle>
      <DialogContent>
        <video width="100%" controls autoPlay style={{ outline: 'none' }}>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    open: state.dialogDetail.status,
    src: state.dialogDetail.src
  };
};

export default connect(
  mapStateToProps,
  { toggleDialog }
)(GameDetailsDialog);
