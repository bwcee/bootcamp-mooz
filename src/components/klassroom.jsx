import AllVideoFeed from "./allVideoFeed.jsx";
import React, { useState, useRef, useEffect } from "react";
import Peer from "simple-peer";

// necessary to avoid error display on screen when one user closes the browser
import * as process from "process";
window.global = window;
window.process = process;
window.Buffer = [];

const Klassroom = ({ setDisplay, klassId, socket }) => {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  // get userId and userName
  const learnerDetails = JSON.parse(localStorage.getItem("learnerDetails"));

  const learnerId = useRef(learnerDetails.id);
  const learnerName = useRef(learnerDetails.learner);

  useEffect(() => {
    /** Get the video stream via peerjs(webrtc) */
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
          console.log("PEERSREF LENGTH", peersRef.current.length);
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
        // Need to use this method to update setPeers if not after one user disconnects and reconnects, the remaining users will see two videos of the reconnected user.
        setPeers([...peersRef.current]);
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
        setPeers(newPeers);
      });

      socket.current.on("disconnect-all-users", () => {
        console.log("DISCONNECTING ALL USERS!");
        peersRef.current.forEach((peerObj) => {
          peerObj.peer.destroy();
        });
        peersRef.current = [];
        setPeers([]);
        socket.current.disconnect();
        setDisplay("logged in!");
      });

      socket.current.on("user-connected", (learnerName) => {
        console.log(`${learnerName} joined the room`);
      });
    };
    getStream();
  }, []);

  /** Initiate call to other each user in room.
   * 1. Initialize new Peer for each user in the room.
   * 2. Emit own signal via sockets to each user in the room.
   * "Inititator: true" enables user to emit signal to userToSignal immediately. */
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
  // To accept a call from the newly joined user.
  // * 1. Initialize new Peer for newly joined user in the room
  // * 2. Emit own signal via sockets to newly joined user.
  // * 3. Accept signal from newly-joined user to establish signal handshake.
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
    <div>
      <button
        className="btn btn-outline-dark room-btn"
        onClick={() => {
          setDisplay("logged in!");
          socket.current.emit("disconnect-me", klassId);
          socket.current.disconnect();
        }}
      >
        Leave session
      </button>
      <button
        className="btn btn-outline-dark room-btn"
        onClick={() => {
          setDisplay("logged in!");
          socket.current.emit("disconnect-all-users", klassId);
          // socket.current.disconnect();
        }}
      >
        End session for all
      </button>
      <AllVideoFeed
        peers={peers}
        learnerId={learnerId}
        learnerName={learnerName}
        userVideo={userVideo}
      />
    </div>
  );
};

export default Klassroom;
