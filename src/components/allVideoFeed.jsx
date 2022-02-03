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
      <div className="video-container d-flex align-items-center">
        <div className="row video-row">
          <div className="col video-col">
            <video muted ref={userVideo} autoPlay playsInline></video>
            {/* <p>LearnerId: {learnerId.current}</p> */}
            {/* <p>{learnerName.current} </p> */}
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
    </>
  );
};

export default AllVideoFeed;
