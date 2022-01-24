import express from "express";

const klassRouters = express.Router();

export default function classRouteFunc(controller) {
  klassRouters.get("/", controller.getKlass.bind(controller));
    
  return klassRouters;
}
