import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useReducer } from "react";

const initialState = {
  name: "",
  title: "",
  description: "",
  target: "",
  deadline: "",
  image: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};

const CustomTextField = ({ title, error, ...other }) => (
  <Box sx={{ width: "100%" }}>
    <Typography sx={{ pb: 1.5 }}>{title} *</Typography>

    <TextField
      required
      helperText={error ? error.message : null}
      error={!!error}
      fullWidth
      variant="outlined"
      {...other}
    />
  </Box>
);

export const CampaignForm = ({ handleSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE",
      key: name,
      value: value,
    });
  };

  return (
    <Paper sx={{ p: 5, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ pb: 4 }}>
        Start a new campaign
      </Typography>

      <form onSubmit={(e) => handleSubmit(e, state)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              name="name"
              title="Your Name"
              placeholder="Salman Fazal"
              onChange={handleFormChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              name="title"
              title="Campaign Title"
              placeholder="Write a title"
              onChange={handleFormChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              name="description"
              title="Your Story"
              placeholder="Write your story"
              multiline
              rows={7}
              onChange={handleFormChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              name="target"
              title="Goal"
              placeholder="ETH 0.50"
              //   type="number"
              //   step=".01"
              onChange={handleFormChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              name="deadline"
              title="End Date"
              type="date"
              onChange={handleFormChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              name="image"
              title="Campaign image"
              placeholder="Place image URL of your campaign"
              onChange={handleFormChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            sx={{ display: "flex" }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              onChange={handleFormChange}
              sx={{ textTransform: "inherit", height: 50 }}
            >
              Submit new compaign
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption">
              There are no validations in this form, please manually validate
              each field.
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
