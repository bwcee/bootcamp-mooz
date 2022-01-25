import mongoose from "mongoose";
import User from "../models/User.mjs";
import Klass from "../models/Klass.mjs";
import bcrypt from "bcrypt";

const hash = bcrypt.hashSync("123", 8);

/* 
1. need to put the connection here cos this file runs independently of index.mjs in root folder where connection defined 
2. placed a seed script in package.json so just need to [npm run seed] to run this file
*/
mongoose
  .connect("mongodb://127.0.0.1:27017/zoom_dev")
  .then(() => console.log("successfully connected to mongodb!!"))
  .catch((err) => console.err("error in connecting to mongodb!!", err));

const userSeeds = [
  { name: "teacha", email: "teacha@teacha.com", password: hash, role: "admin" },
  { name: "boya", email: "boya@boya.com", password: hash, role: "learner" },
  { name: "boyb", email: "boyb@boyb.com", password: hash, role: "learner" },
  { name: "boyc", email: "boyc@boyc.com", password: hash, role: "learner" },
  { name: "boyd", email: "boyd@boyd.com", password: hash, role: "learner" },
  { name: "boye", email: "boye@boye.com", password: hash, role: "learner" },
  { name: "boyf", email: "boyf@boyf.com", password: hash, role: "learner" },
  { name: "boyg", email: "boyg@boyg.com", password: hash, role: "learner" },
  { name: "boyhg", email: "boyh@boyh.com", password: hash, role: "learner" },
];

/* 
1. use deleteMany to delete all prev records first b4 seeding 
2. have to use awaits otherwise will jump to closing connx and inserts/queries will fail 
3. close the connection otherwise terminal will be left hanging w an open mongodb connection 
*/
await User.deleteMany({});
const users = await User.insertMany(userSeeds);
console.log("This is result of insertMany", users);
const learners = await User.find({ role: "learner" }).select("name").exec();
console.log("These are learners in the db", learners);
// extract just _id to save into classes collection members field
const learnerIds = learners.map((el) => el._id);
console.log("This is learnerIds", learnerIds);
await Klass.deleteMany({});
const classOne = new Klass({ klassName: "class1", members: learnerIds });
await classOne.save();
console.log("This is class1 before population", classOne);
await classOne.populate({ path: "members", select: "name -_id" });
console.log("This is class1 members after population", classOne.members);
const classTwo = new Klass({
  klassName: "class2",
  members: learnerIds.slice(0, 4),
});
await classTwo.save();
const classThree = new Klass({
  klassName: "class3",
  members: learnerIds.slice(4, 8),
});
await classThree.save();
mongoose.connection.close();

/* 
Not able to use .then or callbacks to achieve the same result above using awaits...
*/
// User.deleteMany({});

// User.insertMany(
//   userSeeds,
//   (err, users) => console.log("This is inserted users", users),
//   User.find({ role: "learner" })
//     .select("name")
//     .exec((err, members) => {
//       console.log("These are users in the db", members);
//       mongoose.connection.close();
//     })
// );
