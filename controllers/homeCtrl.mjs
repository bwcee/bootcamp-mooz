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

  async doSignUp(req, res) {
    const { name, email, password } = req.body;
    try {
      const hashedPass = bcrypt.hashSync(password, 8);
      /* 
      1. cos passing in name/ email arguments to name/ email fields, can use shortform as below 
      2. by default all new sign-ups shld be learner... there prob shld be an admin login to change roles of others to admin when needed 
      3. if there is error => email not correct format/ email duplicate, there will be error thrown, and errorHandler will be activated
      4. errorHandler is in baseCtrl. it simply console logs e error msg in node terminal & sends the err msg back to the front end. 
      */
      const newUser = await this.model.create({
        name,
        email,
        password: hashedPass,
        role: "learner",
      });
      /* can't think of a situation where newUser wld be null... but oh well... guess additional chk doesn't hurt */
      if (!newUser) {
        res.send("null");
      } else {
        const payload = { _id: newUser._id, name: newUser.name };
        const token = jwt.sign(payload, this.salt, { expiresIn: "6h" });
        res.send(token);
      }
    } catch (err) {
      this.errorHandler(err, res);
    }
  }
}

/* there is no doLogOut required since logging out is simply removing token from local storage. so logging out done completely in front end at src/login.jsx wo any need for back end work here */
