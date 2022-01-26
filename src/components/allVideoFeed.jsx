import React, { useState, useRef, useEffect } from "react";
import VideoFeed from "./videoFeed.jsx";

const AllVideoFeed = ({ users }) => {
  console.log("running Allvidofeed");
  // const count = useRef(0);
  // count.current += 1;
  // console.log("users", users);
  // console.log("count", count);

  return (
    <div>
      {users.map((stream, index) => {
        console.log("STREAM", stream);

        return <VideoFeed key={index} stream={stream} index={index} />;
      })}
    </div>
  );
};

export default AllVideoFeed;
