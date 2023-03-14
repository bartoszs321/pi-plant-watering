import React, { useEffect, useRef, useState } from "react";
import "./CameraFeed.css";
import VideoFeed from "./VideoFeed";

const CameraFeed = () => {
  const [showVideo, setShowVideo] = useState(false);

  const imageRef = useRef();

  const toggleVideoHandler = () => {
    if (showVideo) {
      imageRef.current.src = "";
    } 
    setShowVideo((oldState) => !oldState);
  };

  return (
    <div className="container">
      <button className="actionButton" onClick={toggleVideoHandler}>
        Toggle Video
      </button>
      {showVideo && (
        <img
          src="http://192.168.0.83:8080/video"
          ref={imageRef}
        ></img>
      )}
    </div>
  );
};

export default CameraFeed;
