const UserModel = require("../Models/users.model");
const bcrypt = require("bcrypt");

const QueryGetUserById = async (id) => {
  let user = await UserModel.findById(id).exec();
  const { password, ...other } = user._doc;
  return other;
};

const QueryGetAllUsers = async () => {
  let users = await UserModel.find().exec();

  let userswithoutpassword = users.map((user) => {
    const { password, ...other } = user._doc;
    return other;
  });
  return userswithoutpassword;
};

const QueryUpdateUserById = async (id, user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
  const updateUser = await UserModel.findByIdAndUpdate(id, user, {
    new: true,
  }).exec();

  const { password, ...other } = updateUser._doc;
  return other;
};

const QueryDeleteUserById = async (id) => {
  return await UserModel.findByIdAndDelete(id).exec();
};

module.exports = {
  QueryGetUserById,
  QueryGetAllUsers,
  QueryUpdateUserById,
  QueryDeleteUserById,
};
