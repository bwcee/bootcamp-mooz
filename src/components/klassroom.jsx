import AllVideoFeed from "./allVideoFeed.jsx";
import React, { useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

const Klassroom = ({ setDisplay, klassId }) => {
  const [peers, setPeers] = useState([]);
  const socket = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userId = useRef();
  const userName = useRef();
  const peerToBeDestroyed = useRef({});

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

      // get userId and userName
      const learnerDetails = localStorage.getItem("learnerDetails");
      userId.current = learnerDetails.id;
      userName.current = learnerDetails.learner;

      // emit roomId via sockets "join-room"
      socket.current.emit("join-room", klassId, userId, userName);

      socket.current.on("all-users", (users) => {
        console.log("socket connected", "all-users ran");
        // const emptyPeers = [];
        users.forEach((userSocketId) => {
          const peer = createPeer(userSocketId, socket.current.id, stream);
          peersRef.current.push({
            peerId: userSocketId,
            peer,
          });
          // emptyPeers.push(peer);
          setPeers((oldPeers) => [...oldPeers, { peerId: userSocketId, peer }]);
        });
      });

      // To add newly joined user's peer into peersRef and peers state
      socket.current.on("user-joined", (payload) => {
        console.log('received "user-joined"');
        const peer = addPeer(payload.signal, payload.callerId, stream);
        peersRef.current.push({
          peerId: payload.callerId,
          peer,
        });
        setPeers((oldPeers) => [
          ...oldPeers,
          { peerId: payload.callerId, peer },
        ]);
      });

      socket.current.on("receiving-returned-signal", (payload) => {
        console.log('receiving "returned signal"');
        const item = peersRef.current.find((p) => p.peerId === payload.id);
        console.log("item", item);
        item.peer.signal(payload.signal);
      });

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

  // initiate call to userToSignal. "Inititator: true" enables user to emit signal to userToSignal immediately
  const createPeer = (userToSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("sending-signal", { userToSignal, callerId, signal });
    });

    // peer.on("close", () => {
    //   peer.destroy();
    // });

    return peer;
  };

  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      console.log('emitting "returning-signal"');
      console.log("PEER", peer);
      socket.current.emit("returning-signal", { signal, callerId });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <div>
      <AllVideoFeed peers={peers} userVideo={userVideo} />
      <p>This should show video of a particular class with id {klassId}</p>
    </div>
  );
};

export default Klassroom;
