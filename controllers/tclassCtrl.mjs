import BaseController from "./baseCtrl.mjs";
import { resolve } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class TclassController extends BaseController {
  constructor(model, salt) {
    super(model, salt);
  }

  async getClass(req, res) {
    const userToken = req.header("Authorization").replace("Bearer ", "");
    const payload = jwt.verify(userToken, this.salt);
    console.log("This is payload obtained from choosing class", payload);
    try {
      res.send(payload);
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }
}
