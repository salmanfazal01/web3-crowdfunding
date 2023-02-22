import { Button } from "@mui/material";
import React from "react";

const MainButton = ({ children, sx = {}, ...other }) => {
  return (
    <Button
      variant="contained"
      sx={{
        transitionDelay: "1s",
        background:
          "linear-gradient(175deg, rgba(234,38,190,1) 0%, rgba(206,9,148,1) 65%, rgba(170,1,114,1) 90%)",
        textTransform: "inherit",
        "&:hover": {
          transitionDelay: "1s",
          background:
            "linear-gradient(180deg, rgba(234,38,190,1) 0%, rgba(206,9,148,1) 50%)",
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Button>
  );
};

export default MainButton;
