import React from "react";
import CameraFeed from "./CameraFeed";
import CustomWateringForm from "./CustomWateringForm";
import { Navigate, useNavigate } from "react-router-dom";

const WateringPage = () => {
  const nav = useNavigate();
  const handleUserButton = () => {
    return nav("users");
  };
  return (
    <>
      <CameraFeed />
      <CustomWateringForm />
      <button onClick={handleUserButton}>Users</button>
    </>
  );
};

export default WateringPage;
