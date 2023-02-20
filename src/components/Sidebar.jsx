import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { drawerWidth, navlinks } from "../constants";
import { useStateContext } from "../context";
import { LogoMain } from "../utils/images";

const Sidebar = ({ window }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { connect, address, mobileOpen, setMobileOpen } = useStateContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Stack sx={{ height: "inherit" }}>
      <Box sx={{ display: "flex", justifyContent: "center", pt: 3, pb: 2 }}>
        <img
          src={LogoMain}
          style={{ width: "100%", maxHeight: "45px", objectFit: "contain" }}
        />
      </Box>

      <List sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {navlinks.map(({ name, link, disabled, icon: Icon, flex }, index) => {
          if (flex) {
            return <Box key={index} sx={{ flex: 1 }}></Box>;
          }
          return (
            <ListItem key={index} disablePadding>
              <Tooltip title={name}>
                <ListItemButton
                  disabled={disabled}
                  disableGutters
                  onClick={() => {
                    if (!disabled) {
                      navigate(link);
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      my: 1.5,
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 28,
                        color: pathname === link ? "primary.main" : "inherit",
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
