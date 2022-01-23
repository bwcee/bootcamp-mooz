import BaseController from "./baseCtrl.mjs";
import { resolve } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { SALT } = process.env;

export default class HomeController extends BaseController {
  constructor(model, salt) {
    super(model, salt);
  }

  async getStart(req, res) {
    try {
      res.sendFile(resolve("dist", "main.html"));
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }

  async doLogIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await this.model.findOne({email});
      console.log("Sign-in query result", user);
      if (!user) {
        res.send("null");
      } else {
        const logInSuccess = await bcrypt.compare(password, user.password);

        if (logInSuccess) {
          const payload = { id: user._id, user: user.name };
          console.log("This is SALT", this.salt)
          const token = jwt.sign(payload, this.salt, { expiresIn: "6h" });
          console.log("This is token",token)
          res.send(token);
        } else {
          res.send("null");
        }
      }
    } catch (err) {
      this.errorHandler(err, res);
    }
  }
}

/* 
  async doLogOut(req, res) {
    res.clearCookie("loggedIn");
    res.clearCookie("userID");
    res.send(
      "this doesn't work, but think need to end w a res.send to end transaction?"
    );
  } */
