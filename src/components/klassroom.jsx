import AllVideoFeed from "./allVideoFeed.jsx";
import React, { useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import * as process from "process";

window.global = window;
window.process = process;
window.Buffer = [];

const Klassroom = ({ setDisplay, klassId }) => {
  const [peers, setPeers] = useState([]);
  const socket = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  // get userId and userName
  const learnerDetails = JSON.parse(localStorage.getItem("learnerDetails"));

  const learnerId = useRef(learnerDetails.id);
  const learnerName = useRef(learnerDetails.learner);

  /** Get the video stream via peerjs(webrtc) */
  useEffect(() => {
    socket.current = io.connect("/");

    const getStream = async () => {
      let stream;

      // get stream
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (err) {
        console.log(err);
      }

      // add stream to main user's video
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      // emit roomId via sockets "join-room"
      socket.current.emit(
        "join-room",
        klassId,
        learnerId.current,
        learnerName.current
      );

      // receives all users data in the room and creates peersRef and peers. (refer to ReadMe for more information on peersRef and peers)
      socket.current.on("all-users-data", (usersInfo) => {
        console.log('running "all-users-data"');
        usersInfo.forEach((userObj) => {
          const peer = createPeer(
            // user socketId to send signal to
            userObj.socketId,
            // your own socketId
            socket.current.id,
            // your own learnerId
            learnerId.current,
            // your own learnerName
            learnerName.current,
            // your own stream
            stream
          );
          peersRef.current.push({
            peerId: userObj.socketId,
            learnerId: userObj.learnerId,
            learnerName: userObj.learnerName,
            peer,
          });
          setPeers((oldPeers) => [
            ...oldPeers,
            {
              peerId: userObj.socketId,
              learnerId: userObj.learnerId,
              learnerName: userObj.learnerName,
              peer,
            },
          ]);
        });
      });

      // To add newly joined user's peer into peersRef and peers state
      socket.current.on("user-joined", (payload) => {
        console.log("received signal from newly joined user");
        const peer = addPeer(payload.signal, payload.callerId, stream);
        peersRef.current.push({
          peerId: payload.callerId,
          learnerId: payload.learnerId,
          learnerName: payload.learnerName,
          peer,
        });
        setPeers((oldPeers) => [
          ...oldPeers,
          {
            peerId: payload,
            learnerId: payload.learnerId,
            learnerName: payload.learnerName,
            peer,
          },
        ]);
      });

      // Accepts signal from user in the room (call recipient) in a signal handshake
      socket.current.on("receiving-returned-signal", (payload) => {
        console.log('receiving "returned signal"');
        const peerObj = peersRef.current.find((p) => p.peerId === payload.id);
        peerObj.peer.signal(payload.signal);
      });

      // Destroys peer connection and removes peer from peersRef and peers when disconnecting
      socket.current.on("user-disconnected", (disconnectedSocketId) => {
        const peerObj = peersRef.current.find(
          (p) => p.peerId === disconnectedSocketId
        );
        if (peerObj) {
          peerObj.peer.destroy();
        }
        const newPeers = peersRef.current.filter(
          (p) => p.peerId !== disconnectedSocketId
        );
        peersRef.current = newPeers;
        console.log(newPeers);
        setPeers(newPeers);
      });
    };
    getStream();
  }, []);

  /** Initiate call to other each user in room.
   * 1. Initialize new Peer for each user in the room.
   * 2. Emit own signal via sockets to each user in the room. "Inititator: true" enables user to emit signal to userToSignal immediately. */
  const createPeer = (
    userToSignal,
    callerId,
    learnerIdOfCaller,
    learnerNameOfCaller,
    stream
  ) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    console.log("createPeer running");

    // emit own signal to users already in the room
    peer.on("signal", (signal) => {
      console.log("emitting signal to users already in the room");
      socket.current.emit("sending-signal", {
        userToSignal,
        callerId,
        learnerIdOfCaller,
        learnerNameOfCaller,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    console.log("created new Peer for newly joined user");
    /** Sends signal to newly joined user */
    peer.on("signal", (signal) => {
      console.log("emitting signal to newly joined user");
      socket.current.emit("returning-signal", { signal, callerId });
    });
    /** Accepts signal from newly joined user in a signal handshake */
    console.log("Accepted signal from newly joined user");
    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <>
      <div className="d-flex justify-content-between" id="top-bar">
        <div className="d-flex align-items-center">
          <div className="mx-3">
            <i className="far fa-hand-spock" id="app-logo"></i>
          </div>
          <div className="d-flex align-items-center p-1 top-bar-border">
            <div className="mx-3">
              <small className="text-muted fw-bold">No agenda set</small>
            </div>
            <a href="#" className="btn btn-outline-dark" id="top-agenda-btn">
              <small className="fw-bold mx-1">Set agenda</small>
            </a>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="top-bar-border">
            <a href="#" className="btn">
              <i class="fas fa-cog fs-5"></i>
            </a>
          </div>
          <div className="top-bar-border mx-1">
            <a href="#" className="btn">
              <i class="fas fa-user-plus fs-5"></i>
            </a>
          </div>
          <div className="top-bar-border">
            <a href="#" className="btn">
              <i class="fas fa-users fs-5"></i>
              <span className="ms-2">1 / 4</span>
            </a>
          </div>
        </div>
      </div>
      <div className="d-flex video-container">
        <div className="d-flex align-items-center">
          <div className="side-bar m-3 py-2">
            <div class="btn-group-vertical d-flex flex-column">
              <button className="btn">
                <i className="fas fa-microphone side-icon"></i>
                <span className="side-text">Mic</span>
              </button>
              <button className="btn d-flex flex-column align-items-center">
                <i class="fas fa-video side-icon"></i>
                <span className="side-text">Video</span>
              </button>
              <button className="btn d-flex flex-column align-items-center">
                <i class="fas fa-desktop side-icon"></i>
                <span className="side-text">Share</span>
              </button>
              <button className="btn d-flex flex-column align-items-center">
                <i class="far fa-hand-point-up side-icon"></i>
                <span className="side-text">Queue</span>
              </button>
              <button className="btn d-flex flex-column align-items-center">
                <i class="far fa-comment-dots side-icon"></i>
                <span className="side-text">Chat</span>
              </button>
              <button className="btn d-flex flex-column align-items-center">
                <i class="fas fa-pencil-alt side-icon"></i>
                <span className="side-text">Notes</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-fill">
          <AllVideoFeed
            peers={peers}
            learnerId={learnerId}
            learnerName={learnerName}
            userVideo={userVideo}
          />
        </div>
        <div className="d-flex align-items-center">
          <div className="side-bar m-3 py-2">
            <div className="btn-group-vertical d-flex flex-column">
              <button className="btn d-flex flex-column align-items-center">
                <i class="far fa-file-alt side-icon"></i>
                <span className="side-text">Agenda</span>
              </button>
              <button className="btn d-flex flex-column align-items-center">
                <i class="fas fa-bolt side-icon"></i>
                <span className="side-text">Toolbox</span>
              </button>
              <button className="btn d-flex flex-column align-items-center">
                <i class="far fa-question-circle side-icon"></i>
                <span className="side-text">Help</span>
              </button>
              <button className="btn d-flex flex-column align-items-center">
                <i class="fas fa-sign-out-alt side-icon"></i>
                <span className="side-text">Leave</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Klassroom;
