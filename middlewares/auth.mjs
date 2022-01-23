/* haf to import dotenv or SALT returns undefined!! */
import dotenv from "dotenv";
dotenv.config();
const { SALT } = process.env;
import jwt from "jsonwebtoken";

const verifyToken = () => async (req, res, next) => {
  try {
    const userToken = req.header("Authorization").replace("Bearer ", "");

    /* 
    1. if verified, function below will return e payload, otherwise it will throw an error
    2. not bothering to get hold of the payload since not using it here
    */
    jwt.verify(userToken, SALT);

    next();
  } catch (err) {
    err.msg = "not verifed to access this page dude!!"
    return res.status(403).json({ err });
  }
};

export { verifyToken as default };
