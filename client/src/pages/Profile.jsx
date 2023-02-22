import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import CustomSnackbar from "../components/CustomSnackbar";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (address && contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <Paper sx={{ p: 3, pb: 5, borderRadius: 3 }}>
        <Typography variant="h6">
          Your Campaigns ({campaigns.length})
        </Typography>

        <Grid container spacing={5} sx={{ mt: 3 }}>
          {campaigns.map((campaign, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <CampaignCard {...campaign} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {!address && <CustomSnackbar />}
    </div>
  );
};

export default Profile;
