import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar, Typography } from "@mui/material";

const CustomSnackbar = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      //   autoHideDuration={6000}
      onClose={handleClose}
      message={
        <Typography>
          This route is not protected for demo purposes.
          <br />
          Please connect your wallet to create a campaign.
        </Typography>
      }
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default CustomSnackbar;
