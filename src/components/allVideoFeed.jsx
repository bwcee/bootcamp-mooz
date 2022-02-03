import React, { useState, useRef, useEffect } from "react";
import VideoFeed from "./videoFeed.jsx";

const AllVideoFeed = ({
  peers,
  learnerId,
  learnerName,
  userVideo,
  userStream,
  socket,
}) => {
  return (
    <>
      <div id="video-grid">
        <div>
          <video muted ref={userVideo} autoPlay playsInline></video>
          {/* <p>LearnerId: {learnerId.current}</p> */}
          {/* <p>{learnerName.current} </p> */}
        </div>
        {peers.map((peer) => {
          return (
            <VideoFeed
              key={peer.peerId}
              peerId={peer.peerId}
              peer={peer.peer}
              learnerId={peer.learnerId}
              learnerName={peer.learnerName}
              socket={socket}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllVideoFeed;
