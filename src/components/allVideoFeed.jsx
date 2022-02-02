import React, { useState, useRef, useEffect } from "react";
import VideoFeed from "./videoFeed.jsx";

const AllVideoFeed = ({ peers, learnerId, learnerName, userVideo }) => {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   setCount((count) => count + 1);
  //   console.log("COUNT", count);
  //   console.log(peers);
  // }, [peers]);
  console.log("running AllVideofeed");
  console.log("** All Peers **", peers);

  return (
    <>
      <div id="video-grid">
        <div className="d-flex flex-fill">
          <video muted ref={userVideo} autoPlay playsInline></video>
          {/* <p>LearnerId: {learnerId.current}</p>
          <p>LearnerName: {learnerName.current} </p> */}
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
