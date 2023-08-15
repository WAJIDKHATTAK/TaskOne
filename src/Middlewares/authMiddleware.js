const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const UserModel = require("../Models/users.model");

const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //    console.log(token)
      // console.log(process.env.JWT_KEY)
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      //    console.log("decoded id is", decoded.id)
      const id = decoded.id;
      //    console.log("id is", id)
      req.user = await UserModel.findById(id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = protect;
