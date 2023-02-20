import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import { useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <Paper sx={{ p: 3, pb: 5, borderRadius: 3 }}>
      <Typography variant="h6">All Campaigns ({campaigns.length})</Typography>

      <Grid container spacing={5} sx={{ mt: 3 }}>
        {campaigns.map((campaign, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <CampaignCard {...campaign} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Home;
