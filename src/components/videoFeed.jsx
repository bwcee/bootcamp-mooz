import React, { useState, useRef, useEffect } from "react";
const VideoFeed = ({ stream, index }) => {
  console.log("hi im here");
  const videoRef = useRef();

  const playVideo = () => {
    videoRef.current.play();
    if (index === 0) {
      videoRef.current.muted = true;
    }
  };
  /** Get the video stream via peerjs(webrtc) */
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [videoRef]);

  return (
    <div id="video-grid">
      <h1>A video should be playing here</h1>
      <div>
        <video ref={videoRef} onLoadedMetadata={playVideo}></video>
      </div>
    </div>
  );
};

export default VideoFeed;
