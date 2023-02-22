import { Box, Container } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { drawerWidth, navbarHeight } from "./constants";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";

const App = () => {
  return (
    <Box>
      <Sidebar />

      <Navbar />

      <Box
        sx={{
          pl: { xs: 0, sm: `${drawerWidth}px` },
          mt: `${navbarHeight}px`,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
