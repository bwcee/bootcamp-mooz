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

/* set app to listen on the given port */
const PORT = process.env.PORT || 3008;
app.listen(PORT);
