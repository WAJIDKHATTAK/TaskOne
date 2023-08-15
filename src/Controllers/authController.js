const AuthService = require("../Services/authService"); 

const Signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    // console.log(req.body);
    if (!password) {
      throw new Error("Please enter password");
    }
    if (password.length < 8) {
      throw new Error("Password must be 8 characters Long.");
    }
    const userdata = req.body;
    let { user, token } = await AuthService.QuerySignupUser(userdata);
    // console.log(user);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log({
      message: error.message,
    });
    next(error);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      throw new Error("Please provide Password.");
    }

    const { user, token } = await AuthService.QueryLoginUser(req.body);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log({
      message: error.message,
    });
    next(error);
  }
};

module.exports = { Signup, Login };