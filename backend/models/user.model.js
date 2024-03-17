import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);
// set up a method to hash the password before saving it to the database
const User = mongoose.model("User", userSchema);

export default User;
