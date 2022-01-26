import express from "express";

const klassRouters = express.Router();

export default function classRouteFunc(controller) {
  klassRouters.get("/", controller.getKlass.bind(controller));
  klassRouters.put("/attendance", controller.doAttendance.bind(controller));
    
  return klassRouters;
}
