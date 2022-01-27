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
    const { klassId, learnerId } = req.body;

    try {
      /* get hold of this current klass document */
      const thisKlass = await this.model.findById(klassId).exec();
      console.log("This is thisKlass before adding attendance", thisKlass)
      // console.log("This is result of pushing array",thisKlass.attendance.push(newAtt))

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
      console.log("This is attIndex", attIndex);
      // const newArray = deconstructed version of 
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
        console.log("This is result of pushing array",thisKlass.attendance.push(newAtt))
        /* thisKlass is not just a simple result from findById above, it's a mongoose query, hence can just use updateOne with thisKlass */
        await thisKlass.updateOne(
          {},
          { attendance: thisKlass.attendance.push(newAtt) }
        ).exec();
      } else if (
        attIndex >= 0 &&
        !thisKlass.attendance[attIndex].attended.includes(learnerId)
      ) {
        await thisKlass.updateOne(
          {},
          {
            attendance: thisKlass.attendance[attIndex].attended.push(learnerId),
          }
        ).exec();
      }

      console.log(
        "This is thisKlass after adding attendance",
        thisKlass,
        "This is thisKlass attendance array after adding attendance",
        thisKlass.attendance
      );
      return res.send(thisKlass);
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }
}
