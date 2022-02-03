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
      <div className="d-flex align-items-center justify-content-center video-flex-container">
        <div className="d-flex">
          <div
            id="video-grid"
            className={
              peers.length === 0
                ? "grid-1x1"
                : peers.length < 4
                ? "grid-2x2"
                : "grid-3x3"
            }
          >
            <div className="video-div">
              <video muted ref={userVideo} autoPlay playsInline></video>
              {/* <p>LearnerId: {learnerId.current}</p> */}
              <div className="learner-name">{learnerName.current} </div>
            </div>
            {peers.map((peer, index) => {
              return (
                <VideoFeed
                  key={peer.peerId}
                  peerId={peer.peerId}
                  peer={peer.peer}
                  learnerId={peer.learnerId}
                  learnerName={peer.learnerName}
                  socket={socket}
                  noScreens={peers.length + 1}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllVideoFeed;
