import mongoose from "mongoose";
const { Schema, model } = mongoose;
/* 
The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes.
*/
const userSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: String,
  },
  { timestamps: true }
);

export default model("User", userSchema);
