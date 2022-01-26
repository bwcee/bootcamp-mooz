import AllVideoFeed from "./allVideoFeed.jsx";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

/** Establish "socket" as socket.io connection */
const socket = io("/");
/** Set up webrtc connection via peerjs at PORT = 3001 */
const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});
/** Initialize object to hold userIds */
const peers = {};
let stream;

const Klassroom = ({ setDisplay, klassId }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  /** The moment a new user connects with peerjs (webrtc), user emit ROOM_ID and USER_ID to server (server will then broadcast to everyone else in the room that the user has connected) */
  myPeer.on("open", (peerId) => {
    const learnerDetails = localStorage.getItem("learnerDetails");
    setUserId(learnerDetails.id);
    setUserName(learnerDetails.learner);
    socket.emit("join-room", klassId, userId, userName, peerId);
  });

  /** Get the video stream via peerjs(webrtc) */
  // useEffect(() => {
  const getStream = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    console.log("stream", stream);
    // push (current user's data) {stream (for now)} to users array
    users.push(stream);
    setUsers(users);
    console.log(users);
  };
  getStream();
  // }, []);

  // call other users in the room
  socket.on("user-connected", (userId, userName, peerId) => {
    connectToNewUser(userId, userName, peerId, stream);
  });

  myPeer.on("call", (call) => {
    // sends stream to caller (caller receives stream with "call.on('stream', ...)")
    call.answer(stream);

    call.on("stream", (userVideoStream) => {
      // push {stream (for now)}
      users.push(userVideoStream);
      setUsers(users);
    });
  });

  const connectToNewUser = (userId, userName, peerId, stream) => {
    // call other users in the room
    const call = myPeer.call(peerId, stream);

    call.on("stream", (userVideoStream) => {
      // push {stream (for now)} to users
      users.push(userVideoStream);
      setUsers(users);

      // add the caller video to your stream
    });

    // call.on("close", () => {
    //   otherUserVideo.remove();
    // });
    peers[userId] = call;
  };

  socket.on("user-disconnected", (userId) => {
    if (peers[userId]) peers[userId].close();
  });

  //------------------------------------------------------
  // NOT DONE: The moment a user enters the room, update the Klass db with the new user

  // const addUsers = async (user) => {
  //   // PUT request to update db with new user
  //   setUsers([...users, { USER_ID, USER_NAME }]);
  // };

  // NOT DONE:
  // 1. Within a useEffect() function, axios.get the array of users in the room from db (presentUsers).
  // 2. setUsers(presentUsers)
  // This will ensure that whenever this component is loaded, we have the latest list of users

  const submitClass = () => {
    const token = localStorage.getItem("sessionToken");
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    try {
      axios.get("/class", auth).then((result) => {
        console.log(result.data);
        result.data ? setDisplay("chose class!") : setDisplay();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AllVideoFeed users={users} />
      <p>This should show video of a particular class with id {klassId}</p>
      <button className="btn btn-primary btn-sm" onClick={submitClass}>
        Chose a class
      </button>
    </div>
  );
};

export default Klassroom;
