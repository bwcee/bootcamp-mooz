import React, { useState, useRef } from "react";
import axios from "axios";

// /** Establish "socket" as socket.io connection */
// const socket = io("/");
// /** Set up webrtc connection via peerjs at PORT = 3001 */
// const myPeer = new Peer(undefined, {
//   host: "/",
//   port: "3001",
// });
// /** Initialize object to hold userIds */
// const peers = {};

// /** The moment a new user connects with peerjs (webrtc), user emit ROOM_ID and USER_ID to server (server will then broadcast to everyone else in the room that the user has connected) */
// myPeer.on("open", () => {
//   // NOT DONE: get USER_ID from localStorage
//   // NOT DONE: get ROOM_ID via params
//   socket.emit("join-room", ROOM_ID, USER_ID);
// });

// const [users, setUsers] = useState([]);

// //------------------------------------------------------
// // NOT DONE: The moment a user enters the room, update the Klass db with the new user

// const addUsers = async (user) => {
//   // PUT request to update db with new user
//   setUsers([...users, {USER_ID, USER_NAME}]);
// };

// // NOT DONE:
// // 1. Within a useEffect() function, axios.get the array of users in the room from db (presentUsers).
// // 2. setUsers(presentUsers)
// // This will ensure that whenever this component is loaded, we have the latest list of users

// const addVideoStream = (video, stream) => {
//   video.srcObject = stream;
//   video.addEventListener("loadedmetadata", () => {
//     video.play();
//   });
//   videoGrid.append(video);
// };

// /** Get the video stream via peerjs(webrtc) */

// navigator.mediaDevices
//   .getUserMedia({
//     video: true,
//     audio: true,
//   })
//   .then((stream) => {
//     addVideoStream(myVideo, stream);

//     myPeer.on("call", (call) => {
//       call.answer(stream);
//       const otherUserVideo = document.createElement("video");
//       call.on("stream", (userVideoStream) => {
//         addVideoStream(otherUserVideo, userVideoStream);
//       });
//     });

//     socket.on("user-connected", (userId) => {
//       console.log("User connected", userId);
//       connectToNewUser(userId, stream);
//     });
//   });

// connectToNewUser = (userId, stream) => {
//   const call = myPeer.call(userId, stream);
//   const otherUserVideo = document.createElement("video");
//   call.on("stream", (userVideoStream) => {
//     addVideoStream(otherUserVideo, userVideoStream);
//   });
//   call.on("close", () => {
//     otherUserVideo.remove();
//   });
//   peers[userId] = call;
// };

// socket.on("user-disconnected", (userId) => {
//   if (peers[userId]) peers[userId].close();
// });

const Klassroom = ({ setDisplay, klassId }) => {
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
      {/* <allVideoFeed users={users} /> */}
      This should show video of a particular class with id {klassId}
      <button className="btn btn-primary btn-sm" onClick={submitClass}>
        Chose a class
      </button>
    </div>
  );
};

export default Klassroom;
