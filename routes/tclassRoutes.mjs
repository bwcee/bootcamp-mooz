import express from "express";

const tclassRouters = express.Router();

export default function classRouteFunc(controller) {
  tclassRouters.get("/", controller.getClass.bind(controller));
    
  return tclassRouters;
}
