import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import CustomWateringForm from "./Components/CustomWateringForm";
import CameraFeed from "./Components/CameraFeed";

const App = () => {
  return (
    <div className="App">
      <h1 className="App-header">Pi Watering Project of me ded bonsai</h1>
      <CameraFeed />
      <CustomWateringForm />
    </div>
  );
};

export default App;
