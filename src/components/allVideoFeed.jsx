import React, { useState, useRef, useEffect } from "react";
import VideoFeed from "./videoFeed.jsx";
import StyledVideo from "./styledVideo.jsx";

const AllVideoFeed = ({ peers, userVideo }) => {
  console.log("running Allvidofeed");
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((count) => count + 1);
    console.log("COUNT", count);
    console.log(peers);
  }, [peers]);

  return (
    <>
      <h1>A video should be playing here</h1>
      <div id="video-grid">
        <div>
          <StyledVideo muted ref={userVideo} autoPlay playsInline />
        </div>
        {peers.map((peer) => {
          return <VideoFeed key={peer.peerId} peer={peer.peer} />;
        })}
      </div>
    </>
  );
};

export default AllVideoFeed;
