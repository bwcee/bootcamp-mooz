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
      console.log("This is result from getting klass", result);
      res.send(result);
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }

  async doAttendance(req, res) {
    const { klassId, attended } = req.body;
    let updatedKlass;
    try {
      /* get hold of this current klass document */
      const thisKlass = await this.model.findById(klassId).exec();
      console.log("This is thisKlass", thisKlass);
      /* 
      1. chk if attendance object for current date alr created 
      2. using .toLocaleDateString("en-GB") to get a string in the format dd/mm/yyyy otherwise the raw dates using el.date and new Date() are likely to be diff
      */
      const attIndex = thisKlass.attendance.findIndex((el) => {
        el.date.toLocaleDateString("en-GB") ==
          new Date().toLocaleDateString("en-GB");
      });
      /* if there is no attendance record for this date, create a new attendance object and push into attendance */
      if (attIndex < 0) {
        const newAtt = {
          date: new Date(),
          attended: [attended],
        };
        updatedKlass = await this.model.updateOne(
          { _id: klassId },
          {
            attendance: thisKlass.attendance.push(newAtt),
          }
        );
        return res.send(updatedKlass);
      } else if (!thisKlass.attendance[attIndex].attended.includes(attended)) {
        /* 
        1. above condition chks if learner already in attended arr for this date 
        2. only update attended arr if learner not included so attendance for learner not taken multiple times for a single date  
        */
        updatedKlass = await this.model.updateOne(
          { _id: klassId },
          {
            attendance: thisKlass.attendance[attIndex].attended.push(attended),
          }
        );
        return res.send(updatedKlass);
      }
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }
}
