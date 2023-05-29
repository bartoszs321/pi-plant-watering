import React, { useEffect, useRef, useState } from "react";
import "./CameraFeed.css";

const CameraFeed = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [onError, setOnError] = useState(false);

  const imageRef = useRef();

  const toggleVideoHandler = () => {
    setOnError(false);
    if (showVideo) {
      // Stop the feed from loading in the background
      imageRef.current.src = "";
    }
    if (!onError) setShowVideo((oldState) => !oldState);
  };

  const imageErrorHandler = () => {
    setOnError(true);
    setShowVideo(false);
  };

  return (
    <div className="container">
      <button className="actionButton" onClick={toggleVideoHandler}>
        Toggle Video
      </button>
      {showVideo && (
        <img
          className="video-feed"
          src="https://192.168.0.83:8080/video"
          ref={imageRef}
          onError={imageErrorHandler}
        ></img>
      )}
      {onError && <p>Error Loading Video Feed!</p>}
    </div>
  );
};

export default CameraFeed;
