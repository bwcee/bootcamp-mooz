import React, { useState, useRef, useEffect } from "react";
import VideoFeed from "./videoFeed.jsx";

const AllVideoFeed = ({
  peers,
  learnerId,
  learnerName,
  userVideo,
  userStream,
  socket,
  paxInRoom,
  setPaxInRoom,
}) => {
  const [audioButton, setAudioButton] = useState("Mute");
  const [videoButton, setVideoButton] = useState("Hide cam");

  useEffect(() => {
    setPaxInRoom(peers.length + 1);
  }, [peers]);

  const muteVideo = () => {
    const audioTrack = userStream.current.getTracks()[0];
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setAudioButton("Unmute");
    } else {
      audioTrack.enabled = true;
      setAudioButton("Mute");
    }
  };

  const hideVideo = async () => {
    console.log('running "hideVideo');
    const videoTrack = userStream.current.getTracks()[1];
    console.log(userStream.current.getTracks());
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setVideoButton("Show cam");
    } else {
      videoTrack.enabled = true;
      setVideoButton("Hide cam");
    }
  };

  return (
    <>
      <div id="video-grid">
        <div className="d-flex flex-fill">
          <video muted ref={userVideo} autoPlay playsInline></video>
          {/* <p>LearnerId: {learnerId.current}</p> */}
          <p>{learnerName.current} </p>
          <button className="btn btn-outline-dark room-btn" onClick={muteVideo}>
            {audioButton}
          </button>
          <button className="btn btn-outline-dark room-btn" onClick={hideVideo}>
            {videoButton}
          </button>
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
