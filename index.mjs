import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack_conf/webpack.dev.js';
import mongoose from 'mongoose'
/* this is all tt is needed to create connection to our db */
mongoose.connect("mongodb://localhost:27017/zoom_dev")
/* 
1. unlike sequelize, there is no ./models/index.js to create and export db  
2. just need to import models here. mongoDB connx alr made above. somehow models know which db in mongoDB to update
*/
import User from './models/User.mjs'


/* import routes & controllers */
import homeRoutes from "./routes/home.mjs";
import HomeController from "./controllers/homeCtrl.mjs";
/* initiate/create instance of controllers & pass in models */
const homeControl = new HomeController(User);

/* initialise express instance */
const app = express();

/* middlewares to use */
app.use(express.urlencoded({ extended: false })); // handle req.body from form requests
app.use(express.json()); // handle json from axios post requests

/* expose files stored in e various folders */
app.use(express.static('public'));
app.use(express.static('dist'));

/* set up webpack in dev env - taken from ra, dun know wat's going on... */
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // html only
    writeToDisk: (filePath) => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

/* make use of defined routes */
app.use("/", homeRoutes(homeControl));

/* set app to listen on the given port */
const PORT = process.env.PORT || 3008;
app.listen(PORT);