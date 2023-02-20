import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CampaignForm } from "../components/CampaignForm";
import CustomSnackbar from "../components/CustomSnackbar";
import { useStateContext } from "../context";

const CreateCampaignPage = () => {
  const navigate = useNavigate();
  const { createCampaign, address, connect } = useStateContext();

  const handleSubmit = async (e, form) => {
    e.preventDefault();

    if (!address) {
      await connect();
    }

    await createCampaign({
      ...form,
      target: ethers.utils.parseUnits(form.target, 18),
    });
    navigate("/");
  };

  return (
    <div>
      <CampaignForm handleSubmit={handleSubmit} />
      {!address && <CustomSnackbar />}
    </div>
  );
};

export default CreateCampaignPage;
