import BaseController from "./baseCtrl.mjs";
import { resolve } from "path";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// const { SALT } = process.env;

export default class HomeController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getStart(req, res) {
    try {
      res.sendFile(resolve("dist", "main.html"));
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }
}

/* async getStart(req, res) {
    try {
      res.render("main");
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }

  async doSignIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await this.model.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
      console.log("Sign-in query result", user);
      if (!user) {
        res.send("null");
      } else {
        const logInSuccess = await bcrypt.compare(password, user.password);

        if (logInSuccess) {
          const payload = { id: user.id, user: user.user };
          const token = jwt.sign(payload, SALT, { expiresIn: "6h" });
          
          res.send(token);
        } else {
          res.send("null");
        }
      }
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  async doLogOut(req, res) {
    res.clearCookie("loggedIn");
    res.clearCookie("userID");
    res.send(
      "this doesn't work, but think need to end w a res.send to end transaction?"
    );
  } */
