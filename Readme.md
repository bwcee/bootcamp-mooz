# Technical Notes

- Run this command in terminal to start peerjs server:
  npx peerjs --port 3001

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

# Project learning flow

- how socket.io works (see Socket IO Chat Example below)
- realtime video chat relies on something called webrtc to work
- but we are not using webrtc... we are using Simple Peer which is spsed to simplify using webrtc
- poss to build apps w diff tech stacks e.g. plain html, using ejs or react...
- haf to look into how to use socket.io and Simply Peer specifically for react
- there are some references to getting hold of users' audio visual devices first, then getting hold of the media stream from those devices... for these, webmdn docs are a good ref...
- why use both socket.io and simple peer? socket.io -> used to pass data between front/ backend as well as btw e diff connected users but socket.io not real time... so need simple peer to handle the video streaming bit as it is based off webrtc which supports real time comms like video feeds

### Videos

- [Coding with Chaim - React Chat App Using Socket.IO | Socket IO Tutorial](https://www.youtube.com/watch?v=E4V6nbP_NoQ&t=485s)

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

### Websites

- [Socket IO Chat Example](https://socket.io/get-started/chat)

  - good for getting an overall sense of socket.io

- [Getting started with React, Express, and Socket.io](https://medium.com/@vrinmkansal/getting-started-with-react-express-and-socket-io-658bbd441a9a)

  - useful cos short, sweet, sharp explanation of how to set up socket in react

- [Socket.IO, React and Node.js: Going Real-Time](https://www.valentinog.com/blog/socket-react/)
  - useful cos talks about closing socket connection when component containing the socket connection is removed frm e DOM

### WebMDN

- [Navigator]((https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
  - Navigator is an object tt contains certain properties of a client sys, and has methods to access certain parts of a client sys
  - Navigator.mediaDevices returns a MediaDevices object, which provides access to connected media input devices like cameras and microphones
  - Navigator.mediaDevices.getUserMedia() => has params to specify type of media to request for; returns a promise tt resolves depending on whether user grants permission & whether e client sys can provide e type of media requested; if resolved successfully, a mediaStream object is returned
- [Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
  - <video> html element and it's attributes
- [srcObject](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject)
  - <video> generally uses src attribute which is a url/file path in order to gain access to video to play
  - in our case, we haf a mediaStream object returned frm Navigator.mediaDevices.getUserMedia(), so haf to use srcObject instead
