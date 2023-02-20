import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { daysLeft } from "../utils";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({
  pId,
  image,
  title,
  category = "Education",
  description,
  owner,
  amountCollected,
  target,
  deadline,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <Card
        onClick={() => navigate(`/campaign-details/${pId}`)}
        sx={{
          backgroundColor: "background.card",
          borderRadius: 2,
          //   maxWidth: { xs: 500, sm: 320 },
          transition: "transform .2s",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.04)",
          },
        }}
      >
        <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />

        <CardContent sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={0.8}>
              <FolderOpenIcon sx={{ fontSize: 16, color: "text.secondary" }} />

              <Typography variant="body2" color="text.secondary">
                {category}
              </Typography>
            </Stack>

            <Box>
              <Typography sx={{ fontSize: 17 }}>{title}</Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {description}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2">{amountCollected}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Raised of {target}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2">{daysLeft(deadline)}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Days left
                </Typography>
              </Box>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="center"
            >
              <Avatar sx={{ height: 30, width: 30 }} />
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {owner}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignCard;
