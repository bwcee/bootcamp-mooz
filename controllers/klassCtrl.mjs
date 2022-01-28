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
      // console.log("This is result from getting klass", result);
      res.send(result);
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }

  async doAttendance(req, res) {
    const { klassId, learnerId } = req.body;

    try {
      /* get hold of this current klass document */
      const thisKlass = await this.model.findById(klassId).exec();

      /*
      1. chk if attendance object for current date alr created
      2. using .toLocaleDateString("en-GB") to get a string in the format dd/mm/yyyy otherwise the raw dates using el.date and new Date() are likely to be diff
      */
      const attIndex = thisKlass.attendance.findIndex((el) => {
        return (
          el.date.toLocaleDateString("en-GB") ==
          new Date().toLocaleDateString("en-GB")
        );
      });
      // console.log("This is attIndex", attIndex);
      /* 
      1. if chks attendance for this date does not exist => just push in attendance object
      2. for else if,  attIndex >=0 => attendance for this date exists, so && condition chks learner attendance not alr taken for this date. only if attendance not alr taken, then will push in learnerId  
      */
      if (thisKlass.attendance.length == 0 || attIndex < 0) {
        /* new attendance object to be inserted into klass attendance */
        const newAtt = {
          date: new Date(),
          attended: [learnerId],
        };

        /* thisKlass is a mongoose document. can just manipulate it directly and use .save() to save changes to the db */
        thisKlass.attendance.push(newAtt);
        await thisKlass.save();
      } else if (
        attIndex >= 0 &&
        !thisKlass.attendance[attIndex].attended.includes(learnerId)
      ) {
        thisKlass.attendance[attIndex].attended.push(learnerId);
        await thisKlass.save();
      }
      return res.send(thisKlass);
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }
}
