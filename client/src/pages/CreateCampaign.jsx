import { ethers } from "ethers";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignForm } from "../components/CampaignForm";
import CustomSnackbar from "../components/CustomSnackbar";
import LoadingOverlay from "../components/LoadingOverlay";
import { useStateContext } from "../context";

const CreateCampaignPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { createCampaign, address, connect } = useStateContext();

  const handleSubmit = async (e, form) => {
    e.preventDefault();

    setIsLoading(true);

    if (!address) {
      await connect();
    }

    await createCampaign({
      ...form,
      target: ethers.utils.parseUnits(form.target, 18),
    });

    setIsLoading(false);
    navigate("/");
  };

  return (
    <div>
      {isLoading && <LoadingOverlay text="Creating..." />}
      <CampaignForm handleSubmit={handleSubmit} />
      {!address && <CustomSnackbar />}
    </div>
  );
};

export default CreateCampaignPage;
