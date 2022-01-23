import BaseController from "./baseCtrl.mjs";
import { resolve } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class TclassController extends BaseController {
  constructor(model, salt) {
    super(model, salt);
  }

  async getClass(req, res) {
    try {
      res.send("you got into a verified page");
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }
  }
