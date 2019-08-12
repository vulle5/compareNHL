import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";

const CompareDialog = props => {
  const { onClose, selectedValue, open } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  function handleListItemClick(value) {
    onClose(value);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="compare-dialog-title">Add player to compare</DialogTitle>
      <div style={{ padding: "16px" }}>Hello</div>
    </Dialog>
  );
};

export default CompareDialog;
