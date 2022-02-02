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
  const audioOn = useRef(true);
  const [audioButton, setAudioButton] = useState("Mute");
  const [videoButton, setVideoButton] = useState("Hide cam");

  const [paxInRoom, setPaxInRoom] = useState();
  useEffect(() => {
    setPaxInRoom(peers.length + 1);
  }, [peers]);

  const muteVideo = () => {
    if (audioOn.current === true) {
      userVideo.current.muted = true;
      setAudioButton("Unmute");
    } else {
      userVideo.current.muted = false;
      setAudioButton("Mute");
    }
    audioOn.current = !audioOn.current;
  };

  const hideVideo = async () => {
    console.log('running "hideVideo');
    const videoTrack = userStream.current.getTracks()[1];
    // console.log("This is the userStream", userStream.current.getTracks()[1]);

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
      <div className="btn btn-outline-dark room-btn">{paxInRoom} in room</div>
      <div id="video-grid">
        <div>
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
