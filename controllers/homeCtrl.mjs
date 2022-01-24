import BaseController from "./baseCtrl.mjs";
import { resolve } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const learner = await this.model.findOne({ email });
      if (!learner) {
        res.send("null");
      } else {
        const logInSuccess = await bcrypt.compare(password, learner.password);

        if (logInSuccess) {
          const payload = { _id: learner._id, name: learner.name };
          const token = jwt.sign(payload, this.salt, { expiresIn: "6h" });
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

/* there is no doLogOut required since logging out is simply removing token from local storage. so logging out done completely in front end at src/login.jsx wo any need for back end work here */