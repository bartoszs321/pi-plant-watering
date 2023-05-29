import React, { useState } from "react";

import "./CustomWateringForm.css";

const CustomWateringForm = () => {
  const [duration, setDuration] = useState(5);
  const [speed, setSpeed] = useState(0.6);

  const handleSubmit = async (event) => {
    event.preventDefault();
    var body = {
      duration: duration,
      speed: speed,
    };
    const response = await fetch(
      process.env.REACT_APP_BACKEND_ADDRESS + `/watering/start/${duration}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  };

  const durationChangeHandler = (event) => {
    setDuration(event.target.value);
  };

  const speedChangeHandler = (event) => {
    setSpeed(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="controls">
        <div className="control">
          <label>How long to water for?</label>
          <input
            type="number"
            min="0"
            max="30"
            value={duration}
            onChange={durationChangeHandler}
          />
        </div>
        <div className="control">
          <label>Pump Speed</label>
          <input
            type="float"
            min="0"
            max="1"
            value={speed}
            onChange={speedChangeHandler}
          />
        </div>
      </div>
      <div className="customWatering">
        <button type="submit">Start!</button>
      </div>
    </form>
  );
};

export default CustomWateringForm;
