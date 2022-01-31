import React, { useState, useRef, useEffect } from "react";

const VideoFeed = ({ peer, learnerId, learnerName, index }) => {
  console.log("running VideoFeed");
  console.log("LearnerId", learnerId);
  console.log("LearnerName:", learnerName);
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
      <video playsInline autoPlay ref={videoRef}></video>
      <p>LearnerId: {learnerId}</p>
      <p>LearnerName: {learnerName}</p>
      <p>index: {index}</p>
    </div>
  );
};

export default VideoFeed;
