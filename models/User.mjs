import mongoose from "mongoose";
const { Schema, model } = mongoose;
/* 
1. The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes.
2. mongoose doesn't have type: Email, so need to haf match key below to test if email is correct format
*/
const userSchema = new Schema(
  {
    name: { type: String, lowercase: true, trim: true },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
    role: { type: String, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export default model("User", userSchema);
