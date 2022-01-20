import express from "express";

const homeRouters = express.Router();

export default function homeRouteFunc(controller) {
  homeRouters.get("/", controller.getStart.bind(controller));
  
  return homeRouters;
}
