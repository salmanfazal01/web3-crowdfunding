import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Container,
  Hidden,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { drawerWidth, navbarHeight } from "../constants";
import { useStateContext } from "../context";
import { Person } from "../utils/images";
import MainButton from "./MainButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address, mobileOpen, setMobileOpen } = useStateContext();

  return (
    <AppBar
      color="transparent"
      elevation={0}
      position="absolute"
      sx={{
        height: `${navbarHeight}px`,
        // width: { sm: `calc(100% - ${drawerWidth}px)` },
        // ml: { sm: `${drawerWidth}px` },
        pl: { xs: 0, sm: `${drawerWidth}px` },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Hidden smUp>
          <IconButton onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Hidden smDown>
          <TextField
            placeholder="Search for campaigns..."
            sx={{
              width: "45ch",
              backgroundColor: "background.paper",
              border: "none",
              "& fieldset": { border: "none" },
              borderRadius: "10px",
            }}
            InputProps={{
              sx: {
                height: "50px",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 20, color: "lightgrey" }} />
                </InputAdornment>
              ),
            }}
          />
        </Hidden>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MainButton
            onClick={() => {
              if (address) {
                navigate("/create-campaign");
              } else {
                connect();
              }
            }}
          >
            {address ? "Create Campaign" : "Connect"}
          </MainButton>

          <IconButton sx={{ ml: 2 }}>
            <img
              src={Person}
              style={{
                borderRadius: "50%",
                height: "40px",
                objectFit: "contain",
              }}
            />
          </IconButton>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
