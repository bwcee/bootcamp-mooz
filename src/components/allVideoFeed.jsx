import React, { useState, useRef, useEffect } from "react";
import VideoFeed from "./videoFeed.jsx";
import StyledVideo from "./styledVideo.jsx";

const AllVideoFeed = ({ peers, userVideo }) => {
  console.log("** All Peers **", peers);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((count) => count + 1);
    console.log("COUNT", count);
    console.log(peers);
  }, [peers]);
  console.log("running Allvidofeed");

  return (
    <>
      <h1>A video should be playing here</h1>
      <div id="video-grid">
        <div>
          <video muted ref={userVideo} autoPlay playsInline></video>
        </div>
        {peers.map((peer) => {
          return <VideoFeed key={peer.peerId} peer={peer.peer} />;
        })}
      </div>
    </>
  );
};

export default AllVideoFeed;
