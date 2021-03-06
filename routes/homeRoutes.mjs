import express from "express";

const homeRouters = express.Router();

export default function homeRouteFunc(controller) {
  homeRouters.get("/", controller.getStart.bind(controller));
  homeRouters.post("/", controller.doLogIn.bind(controller));
  homeRouters.post("/signup", controller.doSignUp.bind(controller));
  
  return homeRouters;
}
