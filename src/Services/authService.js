const UserModel = require("../Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const QuerySignupUser = async (user) => {
  const { fname, lname, email, password } = user;
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new UserModel({
      fname,
      lname,
      email,
      password: hashedPassword,
    });
    // console.log(newUser.password)
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      throw new Error("Email already Registered");
    }
    const usernameExists = await UserModel.findOne({ fname });
    if (usernameExists) {
      throw new Error("UserName already Exists");
    }

    const user = await newUser.save();

    const token = jwt.sign(
      { id: user._id, username: user.fname },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.paswword;

    return { user: userWithoutPassword, token };
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};

const QueryLoginUser = async (user) => {
  const { email , password } = user;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return { user: userWithoutPassword, token };
  } catch (error) {
    console.log({
      message: error.message,
    });
    throw error;
  }
};

module.exports = { QuerySignupUser, QueryLoginUser };
