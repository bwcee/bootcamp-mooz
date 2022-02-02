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
    const learnerRole = payload.role;
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
      result.learnerRole = learnerRole;
      // console.log("This is result from getting klass", result);
      res.send(result);
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }

  async getAttendance(req, res) {
    const { klassId } = req.params;

    try {
      /* get hold of this current klass document */
      const thisKlass = await this.model
        .findById(klassId)
        .populate({ path: "members", select: "name role" })
        .exec();
      // console.log("This is thisKlass", thisKlass);
      /*
      find index for current date's attendance
      */
      const attIndex = thisKlass.attendance.findIndex((el) => {
        return (
          el.date.toLocaleDateString("en-GB") ==
          new Date().toLocaleDateString("en-GB")
        );
      });

      const klassAttendance = thisKlass.attendance[attIndex].attended;
      // console.log("This is klassAttendance", klassAttendance);
      const klassMembers = thisKlass.members;
      /* had to convert the _ids to strings otherwise was trying to compare ObjectIds which wld always eval to false even tho they looked alike...  */
      let matchedAttendance = klassMembers.map((member) => {
        if (
          klassAttendance.some((attended) => {
            return (
              attended._id.toString() == member._id.toString() &&
              attended.endedClass == true
            );
          })
        ) {
          return {
            name: member.name,
            role: member.role,
            startedClass: true,
            endedClass: true,
          };
        } else if (
          klassAttendance.some((attended) => {
            return attended._id.toString() == member._id.toString();
          })
        ) {
          return {
            name: member.name,
            role: member.role,
            startedClass: true,
            endedClass: false,
          };
        } else {
          return {
            name: member.name,
            role: member.role,
            startedClass: false,
            endedClass: false,
          };
        }
      });
      const csvString = [
        ["Name", "Role", "Started Class", "Ended Class"],
        ...matchedAttendance.map((el) => [
          el.name,
          el.role,
          el.startedClass,
          el.endedClass,
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");
      // console.log("matchedAttendance in csv", csvString);

      res.status(200).send(csvString);
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
          attended: [{ _id: learnerId }],
        };

        /* thisKlass is a mongoose document. can just manipulate it directly and use .save() to save changes to the db */
        thisKlass.attendance.push(newAtt);
        await thisKlass.save();
      } else if (
        /* think dun haf to convert el._id to string cos comparing ObjectId (el._id) to a string (learnerId) */
        attIndex >= 0 &&
        !thisKlass.attendance[attIndex].attended.some(
          (el) => el._id == learnerId
        )
      ) {
        thisKlass.attendance[attIndex].attended.push({ _id: learnerId });
        await thisKlass.save();
      }
      return res.send(thisKlass);
    } catch (err) {
      return this.errorHandler(err, res);
    }
  }
}
