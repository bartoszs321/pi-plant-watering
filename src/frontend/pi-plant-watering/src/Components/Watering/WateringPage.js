import React from "react";
import CameraFeed from "./CameraFeed";
import CustomWateringForm from "./CustomWateringForm";
import Header from "../Layout/Header";

const WateringPage = () => {
  return (
    <>
      <Header />
      <div className="content-container">
        <CameraFeed />
        <CustomWateringForm />
      </div>
    </>
  );
};

export default WateringPage;
