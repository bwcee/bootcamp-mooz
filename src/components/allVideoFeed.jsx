import React, { useState, useRef, useEffect } from "react";
import VideoFeed from "./videoFeed.jsx";

const AllVideoFeed = ({ peers, learnerId, learnerName, userVideo }) => {
  const [paxInRoom, setPaxInRoom] = useState();
  useEffect(() => {
    setPaxInRoom(peers.length + 1);
  }, [peers]);

  return (
    <>
      <div className="btn btn-outline-dark room-btn">{paxInRoom} in room</div>
      <div id="video-grid">
        <div>
          <video muted ref={userVideo} autoPlay playsInline></video>
          {/* <p>LearnerId: {learnerId.current}</p> */}
          <p>{learnerName.current} </p>
        </div>
        {peers.map((peer) => {
          return (
            <VideoFeed
              key={peer.peerId}
              peer={peer.peer}
              learnerId={peer.learnerId}
              learnerName={peer.learnerName}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllVideoFeed;
