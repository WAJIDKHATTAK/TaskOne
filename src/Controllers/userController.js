const UserService = require("../Services/userService");

const GetAllUsers = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(403);
      throw new Error("Not Authorized");
    }
    const users = await UserService.QueryGetAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log({
      message: error.message,
    });
    res.status(500);
    next(error);
  }
};

const GetUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!req.user.id) {
      res.status(403);
      throw new Error("Not Authorized");
    }
    const user = await UserService.QueryGetUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log({ message: error.message });

    res.status(500);
    next(error);
  }
};

const UpdateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.user.id !== id) {
      res.status(403);
      throw new Error("Not authorized");
    }
    if (req.body.password) {
      if (req.body.password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }
    }
    const user = await UserService.QueryUpdateUserById(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log({ mesasge: error.message });
    // res.status(500).json(error)
    res.status(500);
    next(error);
  }
};

const DeleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.user.id !== id) {
      res.status(403);
      throw new Error("Not authorized");
    }
    await UserService.QueryDeleteUserById(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log({ mesasge: error.message });
    // res.status(500).json(error)
    res.status(500);
    next(error);
  }
};

module.exports = { DeleteUserById, UpdateUserById, GetUserById, GetAllUsers };
