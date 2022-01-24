import BaseController from "./baseCtrl.mjs";
import jwt from "jsonwebtoken";

export default class KlassController extends BaseController {
  constructor(model, salt) {
    super(model, salt);
  }

  async getKlass(req, res) {
    /* the 2 lines below are to extract learner _id & name from token */
    const userToken = req.header("Authorization").replace("Bearer ", "");
    const payload = jwt.verify(userToken, this.salt);
    const learnerId = payload._id;
    const learnerName = payload.name;
    try {
      const learnerKlasses = await this.model
        .find({})
        .where("members")
        .in(learnerId)
        .select("klassName")
        .exec();
      let result = {};
      result.klasses = learnerKlasses;
      result.learnerId = learnerId;
      result.learnerName = learnerName;
      console.log("This is result from getting klass",result)
      res.send(result);
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }
}
