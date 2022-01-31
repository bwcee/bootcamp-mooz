import React, { useState, useRef, useEffect } from "react";
import VideoFeed from "./videoFeed.jsx";

const AllVideoFeed = ({ peers, learnerId, learnerName, userVideo }) => {
  return (
    <>
      <h1>A video should be playing here</h1>
      <div id="video-grid">
        <div>
          <video muted ref={userVideo} autoPlay playsInline></video>
          <p>LearnerId: {learnerId.current}</p>
          <p>LearnerName: {learnerName.current} </p>
        </div>
        {peers.map((peer, index) => {
          return (
            <VideoFeed
              key={peer.peerId}
              peer={peer.peer}
              learnerId={peer.learnerId}
              learnerName={peer.learnerName}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllVideoFeed;
