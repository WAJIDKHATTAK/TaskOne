const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, "Enter your first name."],
      trim: true,
    },
    lname: {
      type: String,
      required: [true, "Enter your first name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Email."],
      unique: [true, "Email Already Registered."],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ]},
      password: {
        type: String,
        required: [true, "Please enter password"],
        trim: true,
      },
    },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
