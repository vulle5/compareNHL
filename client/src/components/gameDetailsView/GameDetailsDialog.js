import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { toggleDialog } from '../../reducers/dialogReducer';

const GameDetailsDialog = ({ open, src, title, toggleDialog }) => {
  const handleClose = () => {
    toggleDialog(false, '', '');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <video width="100%" controls autoPlay style={{ outline: 'none' }}>
          {src ? <source src={src} type="video/mp4" /> : null}
          Your browser does not support the video tag or video does not exist.
        </video>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    open: state.dialogDetail.bool,
    src: state.dialogDetail.src,
    title: state.dialogDetail.title
  };
};

export default connect(
  mapStateToProps,
  { toggleDialog }
)(GameDetailsDialog);
