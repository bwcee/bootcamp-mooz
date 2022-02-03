import React, { useState, useRef, useEffect } from "react";

const VideoFeed = ({
  peerId,
  peer,
  learnerId,
  learnerName,
  socket,
  noScreens,
  index,
}) => {
  console.log("running VideoFeed");
  console.log("LearnerId", learnerId);
  console.log("LearnerName:", learnerName);
  const thisStream = useRef();
  const videoRef = useRef();
  const [refresh, setRefresh] = useState();

  /** Get the video stream via simple-peer (webrtc) */
  useEffect(() => {
    console.log("ADDING STREAM TO VIDEO");
    console.log("noScreens", noScreens);
    console.log("index", index);
    // receive remote video stream and assign stream to video object
    peer.on("stream", (stream) => {
      // saving this stream in useRef so that we can use it to toggle video input from this user later
      thisStream.current = stream;
      console.log("STREAM", stream);
      // adds stream to video
      videoRef.current.srcObject = stream;
    });
  });

  return (
    <>
      {/* {index === 1 ? <div className="w-100"></div> : <></>} */}
      <></>
      <div className="col video-col">
        <video playsInline autoPlay ref={videoRef}></video>
        {/* <p>LearnerId: {learnerId}</p> */}
        {/* <p>{learnerName}</p> */}
      </div>
    </>
  );
};

export default VideoFeed;
