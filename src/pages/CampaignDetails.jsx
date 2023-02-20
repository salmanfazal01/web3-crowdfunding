import {
  Avatar,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import MainButton from "../components/MainButton";
import { useStateContext } from "../context";
import { daysLeft } from "../utils";

const StatCard = ({ title, subtitle }) => {
  return (
    <Stack
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        textAlign: "center",
        height: "100%",
        minHeight: 80,
        minWidth: 130,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ flex: 1 }}>
        <Typography variant="h6">{title}</Typography>
      </Stack>

      <Box
        sx={{
          bgcolor: "background.card",
          borderBottomLeftRadius: "inherit",
          borderBottomRightRadius: "inherit",
          p: 1,
        }}
      >
        <Typography>{subtitle}</Typography>
      </Box>
    </Stack>
  );
};

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState({});
  const [amount, setAmount] = useState("");

  const { donate, getCampaign, contract, address } = useStateContext();

  const fetchCampaign = async () => {
    const data = await getCampaign(id);

    setCampaign(data);
  };

  useEffect(() => {
    if (contract) fetchCampaign();
  }, [contract, address]);

  const remainingDays = daysLeft(campaign.deadline);
  const donations = [...new Set(campaign.donations)].length;

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(id, amount);

    navigate("/");
    setIsLoading(false);
  };

  if (!campaign.id) {
    return (
      <div>
        <LoadingOverlay text="Fetching campaign..." />
      </div>
    );
  }

  return (
    <Box sx={{ mt: 1, mb: 5 }}>
      {isLoading && <LoadingOverlay text="Donating..." />}

      <Typography variant="h5">{campaign.title}</Typography>

      <Grid container sx={{ pt: 3 }} spacing={5}>
        <Grid item xs={12} md={9} lg={10} xl={10.5}>
          <img
            src={campaign.image}
            style={{
              width: "100%",
              objectFit: "cover",
              borderRadius: "20px",
              maxHeight: "380px",
            }}
          />
        </Grid>

        <Grid item xs={12} md={3} lg={2} xl={1.5} sx={{ height: "inherit" }}>
          <Stack
            direction={{ xs: "row", md: "column" }}
            spacing={4}
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <StatCard title={remainingDays} subtitle="Days Left" />
            <StatCard
              title={`${campaign.amountCollected} ETH`}
              subtitle={`Raised of ${campaign.target}`}
            />
            <StatCard title={donations} subtitle="Donations" />
          </Stack>
        </Grid>
      </Grid>

      <Grid container sx={{ pt: 5 }} spacing={6}>
        <Grid item xs={12} md={6} lg={7} xl={8}>
          <Stack spacing={4}>
            {/* Creator */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500, pb: 2 }}>
                CREATOR
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <Avatar />

                <Box>
                  <Typography variant="body2">{campaign.owner}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {campaign.name}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Story */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500, pb: 2 }}>
                STORY
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: "pre-line" }}
              >
                {campaign.description}
              </Typography>
            </Box>

            {/* Donators */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500, pb: 2 }}>
                DONATORS
              </Typography>

              <Stack spacing={2}>
                {campaign.donations?.map((don, i) => (
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    key={i}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {i + 1}. {don.donator}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {don.amount} ETH
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} lg={5} xl={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={3}>
              <Typography
                color="text.secondary"
                variant="h6"
                sx={{ textAlign: "center" }}
              >
                Fund the campaign
              </Typography>

              <TextField
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.1 (ETH)"
                fullWidth
              />

              <Stack spacing={1} sx={{ bgcolor: "background.card", p: 2 }}>
                <Typography variant="body2">
                  Back it because you believe in it.
                </Typography>

                <Typography color="text.secondary">
                  Support the project for no reward, just because it speaks to
                  you.
                </Typography>
              </Stack>

              <MainButton
                size="large"
                fullWidth
                onClick={handleDonate}
                disabled={!address}
              >
                {address ? "Fund Campaign" : "Connect wallet to donate"}
              </MainButton>

              <Typography variant="caption" color="error">
                DO NOT SEND REAL ETH, YOU WILL LOSE IT ALL. USE THE GOERLI TEST
                NETWORK INSTEAD.
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignDetails;
