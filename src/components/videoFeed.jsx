import React, { useState, useRef, useEffect } from "react";
import StyledVideo from "./styledVideo.jsx";

const VideoFeed = ({ peer }) => {
  console.log("running VideoFeed");
  const videoRef = useRef();

  /** Get the video stream via simple-peer (webrtc) */
  useEffect(() => {
    peer.on("stream", (stream) => {
      videoRef.current.srcObject = stream;
    });
  });

  return (
    <div>
      <StyledVideo playsInline autoPlay ref={videoRef} />
    </div>
  );
};

export default VideoFeed;
