# Technical Notes

- Run this command in terminal to start mongoose:
  mongosh

- Run this command in terminal to start express app:
  npm start

- this is what a fully populated klasses collection document looks like. attendance for 2 learners taken for class1 on 27 Jan 2022.

```
{
    "_id" : ObjectId("61eeb983d239cc6a736a50d7"),
    "klassName" : "class1",
    "members" : [
        ObjectId("61eeb983d239cc6a736a50cb"),
        ObjectId("61eeb983d239cc6a736a50cc"),
        ObjectId("61eeb983d239cc6a736a50cd"),
        ObjectId("61eeb983d239cc6a736a50ce"),
        ObjectId("61eeb983d239cc6a736a50cf"),
        ObjectId("61eeb983d239cc6a736a50d0"),
        ObjectId("61eeb983d239cc6a736a50d1"),
        ObjectId("61eeb983d239cc6a736a50d2")
    ],
    "attendance" : [
        {
            "date" : ISODate("2022-01-27T08:28:06.058Z"),
            "attended" : [
                ObjectId("61eeb983d239cc6a736a50cb"),
                ObjectId("61eeb983d239cc6a736a50cc")
            ],
            "_id" : ObjectId("61f257967565a5772ff2f812")
        }
    ],
    "createdAt" : ISODate("2022-01-24T14:36:51.490Z"),
    "updatedAt" : ISODate("2022-01-27T08:41:02.308Z"),
    "__v" : 2
}

```

- this is what displayKlasses looks like

  ```
  {
    klasses:
      [
        {_id: '61eeb983d239cc6a736a50d7', klassName: 'class1'},
        {_id: '61eeb983d239cc6a736a50da', klassName: 'class2'}
      ],
    learnerId: '61eeb983d239cc6a736a50cc',
    learnerName: 'boyb'
  }
  ```

- learnerDetails stored in local storage with `localStorage.setItem("learnerDetails", learnerDetails)`
  <br>sample learnerDetails: `{id: '61eeb983d239cc6a736a50cc', learner: 'boyb'}`

# Project Learning Notes

- used/ learned a few new techs/ concepts for this project:

  - Server side
    - mongodb/ mongoose
    - socket.io
  - Client side
    - socket.io-client
    - simple-peer
    - Navigator object & `<video>` html element
    - localStorage limitations

- very importantly, also learnt we need to ensure we know how to use the tools within the context of our chosen tech stack => in this case MongoDB, Express, React, Node (MERN)

## mongodb/mongoose

- mongodb is one of several NoSQL (not only SQL) databases
- mongodb is a document database => instead of tables, it has collections, and instead of records, data is stored in what are known as documents. data structured as key-value pairs in documents.
- mongoose is mongodb's Object Data Modelling (ODM) library much like sequelize is SQL's Object-relational mapping (ORM) tool
  <br>

#### References

1. [The basics of NoSQL databases—and why we need them](https://www.freecodecamp.org/news/nosql-databases-5f6639ed9574/)
2. official mongodb docs good ref for data modelling -> thinking about relationships between collections
3. official mongoose docs good ref for models and documents and their various methods
4. [Updating Documents in Mongoose](https://masteringjs.io/tutorials/mongoose/update)
   - very useful in drawing distinction between updating mongodb thru documents or models

## socket.io

- socket.io is a library built on top of websockets that allows real time comms between a server and a client. multiple clients can also be connected to the server which allows all connected clients to comms in real time
- socket.io has another package for the client side, socket.io-client. when using react, need to install this as well, so it can be imported and used in react function components.
- for this project, socket.io used as a "signaling server" to exchange signaling data between e various browsers until peer-to-peer connections r established (ref 7 explains why this is needed)
  <br>

#### References

1. [Is socket.io the WebRTC or WebSocket or something else?](https://stackoverflow.com/questions/36104843/is-socket-io-the-webrtc-or-websocket-or-something-else/51850663)
2. [Coding with Chaim - React Chat App Using Socket.IO | Socket IO Tutorial](https://www.youtube.com/watch?v=E4V6nbP_NoQ&t=485s)

   - good ref on using socket.io w react
   - sample code below shows how to set-up a socket server in express root file

   ```
   const express = require("express");
   const http = require("http");
   const app = express();
   const server = http.createServer(app);
   const socket = require("socket.io");
   const io = socket(server);

   io.on("connection", socket => {
     socket.emit("your id", socket.id);
     socket.on("send message", body => {
         io.emit("message", body)
     })
   })


   server.listen(8000, () => console.log("server is running on port 8000"));
   ```

   - truncated code below shows how socket.io-client used in react component

   ```
   import React, { useState, useEffect, useRef } from "react";
   import io from "socket.io-client";
   ...

   const App = () => {
    const [yourID, setYourID] = useState();

    const socketRef = useRef();

    useEffect(() => {
      socketRef.current = io.connect('/');

      socketRef.current.on("your id", id => {
        setYourID(id);
      })

      socketRef.current.on("message", (message) => {
        console.log("here");
        receivedMessage(message);
      })
    }, []);
    ...
   ```

3. [Socket IO Chat Example](https://socket.io/get-started/chat)
   - good for getting an overall sense of socket.io
4. [Exploring Socket.IO in a React Working Environment](https://betterprogramming.pub/exploring-socket-io-in-react-working-environment-e505bf1c857c)
   - post w super detailed explanations!
5. [Getting started with React, Express, and Socket.io](https://medium.com/@vrinmkansal/getting-started-with-react-express-and-socket-io-658bbd441a9a)
   - useful cos short, sweet, sharp explanation of how to set up socket in react
6. [Socket.IO, React and Node.js: Going Real-Time](https://www.valentinog.com/blog/socket-react/)
   - useful cos talks about closing socket connection when component containing the socket connection is removed frm e DOM
7. [Building a Signaling Server for Simple-Peer](https://javascript.plainenglish.io/building-a-signaling-server-for-simple-peer-f92d754edc85)

## simple-peer

- webrtc is the technology tt allows real time video streaming to take place directly between browsers **without the use of intervening servers** (ref 1). simple-peer is a package tt makes it easier to use webrtc and to allow for real time video streaming between multiple clients
  <br>

#### References

1. [Peer-to-peer communications with WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC/Peer-to-peer_communications_with_WebRTC)
2. [Coding with Chaim - Create a React webRTC Video Chat Application Using Simple Peer](https://www.youtube.com/watch?v=BpN6ZwFjbCY)
   - good, quick, sharp intro to setting up video chat in react using simple peer... requires knowledge of socket.io to start to make sense of it
3. [How to Create a ReactJS Video Chat App with WebRTC and Socket.io](https://www.youtube.com/watch?v=gnM3Ld6_upE&t=5s)
   - refs Chaim's video above, adds what happens when the other party ends a video chat
4. [Let's build a video conferencing app](https://dev.to/kannndev/let-s-build-a-video-conferencing-app-pp)
   - another potential link to look at wat happens when a call is disconnected

## Navigator object & `<video>` html element

- [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
  - Navigator is an object tt contains certain properties of a client sys, and has methods to access certain parts of a client sys
  - Navigator.mediaDevices returns a MediaDevices object, which provides access to connected media input devices like cameras and microphones
  - Navigator.mediaDevices.getUserMedia() => has params to specify type of media to request for; returns a promise tt resolves depending on whether user grants permission & whether e client sys can provide e type of media requested; if resolved successfully, a mediaStream object is returned
- [Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
  - `<video>` html element and it's attributes
- [srcObject](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject)
  - `<video>` generally uses src attribute which is a url/file path in order to gain access to video to play
  - in our case, we haf a mediaStream object returned frm Navigator.mediaDevices.getUserMedia(), so haf to use srcObject instead

## localStorage

- [Storing and retrieving JavaScript objects in localStorage](https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/)
  - turns out localStorage can only store strings. so if want to store objects, need to use `JSON.stringify()` to convert objec to a JSON string before storage
  - on retrieval. use `JSON.parse()` to convert the JSON string back into a javascript object literal

# HOW SIMPLE-PEER CODE WORKS

## peersRef:

- Responsible for establishing signal connection with each user in the room
- Contains each user's information
  {
  peerId: payload.callerId,
  learnerId: userObj.learnerId,
  learnerName: userObj.learnerName,
  peer,
  }
- "peer" refers to a Peer object that contains a lot of different meta data.
- When this peer accepts a signal from another user, it will send its own signal back to the user (via sockets) and the other user's peer will accept the incoming signal
- This completes the "handshake", meaning these two users have established a signal connection between just the two of them.

## peers:

- Responsible for rendering each user's video stream on the frontend
- Contains each user's peer
- { peer1, peer2 ...}

# Notes on how we debugged errors:

## Error #1:

- Error: When one user closes the browser, the other users' browsers will display an error called "process is not defined".

- Solution: Reason is because peer.destroy only works when we install "process" i.e. npm i process + add some polyfill code (i dont know what polyfills are either). See https://github.com/feross/simple-peer/issues/611

## Error #2:

- Problem: Cannot read object that was stored in localStorage

- Solution: local storage limited to handle only string key/value pairs. To store and access object in local storage, you should use JSON.stringify to store and JSON.parse to get the object
  https://stackoverflow.com/questions/42020577/storing-objects-in-localstorage

# DEPLOYMENT ONLINE

## Mongo Atlas

- DB is hosted on mongo atlas (free plan)
- Updated mongoose URL (see .env details sent on chat)

## Heroku

- Tristan uploaded it on his personal heroku account.
- To push to heroku, just push all new changes to origin main.
- Tristan will push to heroku using my account from there
