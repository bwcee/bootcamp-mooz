import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "./webpack_conf/webpack.dev.js";
import mongoose from "mongoose";
// import verifyToken middleware
import verifyToken from "./middlewares/auth.mjs";
/* get SALT here and pass it as argument to controllers below */
import dotenv from "dotenv";
dotenv.config();
const { SALT } = process.env;
/* 
1. this is all tt is needed to create connection to our db 
2. the funky syntax in console.log/err just to print out in color so easier to see
*/
mongoose
  // Tristan: changed "localhost" to "127.0.0.1" because this is the only way it will work on mac
  .connect("mongodb://127.0.0.1:27017/zoom_dev")
  .then(() =>
    console.log("\x1b[34m%s\x1b[0m", "sucessfully connected to mongodb!!")
  )
  .catch((err) => {
    console.error("\x1b[41m%s\x1b[0m", "error connecting to mongodb!!");
    console.error("\x1b[41m%s\x1b[0m", err);
  });
/* 
1. unlike sequelize, no need ./models/index.js to create and export db  
2. just need to import models here
3. from mongoose docs: "Every model has an associated connection. When you use mongoose.model(), your model will use the default mongoose connection."
the default connection is on line 8: mongoose.connect("mongodb://localhost:27017/zoom_dev")
*/
import User from "./models/User.mjs";
import Klass from "./models/Klass.mjs";

/* import routes & controllers */
import homeRoutes from "./routes/homeRoutes.mjs";
import HomeController from "./controllers/homeCtrl.mjs";
import klassRoutes from "./routes/klassRoutes.mjs";
import KlassController from "./controllers/klassCtrl.mjs";
/* initiate/create instance of controllers & pass in models and SALT so can do jwt verification*/
const homeControl = new HomeController(User, SALT);
const klassControl = new KlassController(Klass, SALT);

/* initialise express instance */
const app = express();

/** Get a server to be used with socket.io  */
import http from "http";
const server = http.Server(app);

/** Bring in socket.io. we pass in server to socket.io so that socket.io knows which server we are using and how to interact with it */
import { Server, Socket } from "socket.io";
const io = new Server(server);

/* middlewares to use */
app.use(express.urlencoded({ extended: false })); // handle req.body from form requests
app.use(express.json()); // handle json from axios post requests

/* expose files stored in e various folders */
app.use(express.static("public"));
app.use(express.static("dist"));

/* set up webpack in dev env - taken from ra, dun know wat's going on... */
const env = process.env.NODE_ENV || "development";
if (env === "development") {
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      // html only
      writeToDisk: (filePath) => /\.html$/.test(filePath),
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    })
  );
}

/* make use of defined routes */
app.use("/", homeRoutes(homeControl));
/* middleware placed here so all routes below will haf to be verified first*/
app.use(verifyToken());
app.use("/class", klassRoutes(klassControl));

const users = {};
const socketToRoom = {};

/** Establish socket connection */
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, learnerId, learnerName) => {
    console.log('running "join-room"');
    if (users[roomId]) {
      /** The following code is to limit the number of users in the room */
      // const length = users[roomId].length;
      // if (length === 4) {
      //   socket.emit("room-full");
      //   return;
      // }
      users[roomId].push({
        socketId: socket.id,
        learnerId: learnerId,
        learnerName: learnerName,
      });
    } else {
      users[roomId] = [
        {
          socketId: socket.id,
          learnerId: learnerId,
          learnerName: learnerName,
        },
      ];
    }
    // To keep track of roomId by socket.id (for disconnect purpose)
    socketToRoom[socket.id] = roomId;
    const usersInThisRoom = users[roomId].filter(
      (userObj) => userObj.socketId !== socket.id
    );
    // socket.emit : emit to just one socket
    // io.sockets.emit : emit to all sockets
    socket.emit("all-users-data", usersInThisRoom);
  });

  // Transfer newly joined user (caller)'s signal (+ other data) to each user (call recipients) in the room
  socket.on("sending-signal", (payload) => {
    io.to(payload.userToSignal).emit("user-joined", {
      signal: payload.signal,
      callerId: payload.callerId,
      learnerId: payload.learnerIdOfCaller,
      learnerName: payload.learnerNameOfCaller,
    });
  });

  // Send user (call recipient)'s signal to newly joined user (caller)
  socket.on("returning-signal", (payload) => {
    io.to(payload.callerId).emit("receiving-returned-signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log(`disconnected socket is ran. socket.id = ${socket.id}`);
    const roomId = socketToRoom[socket.id];
    let room = users[roomId];
    if (room) {
      room = room.filter((userObj) => userObj.socketId !== socket.id);
      users[roomId] = room;
    }
    // send socketId of disconnected user to everyone in the room
    socket.broadcast.emit("user-disconnected", socket.id);
    console.log("user-disconnected is sent out");
  });
});

/* set app to listen on the given port */
const PORT = process.env.PORT || 3008;
/** Changed to server; its the same as using app */
server.listen(PORT);
