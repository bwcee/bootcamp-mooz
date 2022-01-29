import React, { useState, useRef, useEffect } from "react";
import StyledVideo from "./styledVideo.jsx";

const VideoFeed = ({ peer }) => {
  console.log("running VideoFeed");
  const videoRef = useRef();

  /** Get the video stream via simple-peer (webrtc) */
  useEffect(() => {
    // receive remote video stream and assign stream to video object
    peer.on("stream", (stream) => {
      videoRef.current.srcObject = stream;
    });
  });

  return (
    <div>
      <video playsInline autoPlay ref={videoRef}></video>;
    </div>
  );
};

export default VideoFeed;
