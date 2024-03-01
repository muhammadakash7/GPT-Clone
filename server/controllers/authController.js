const errorHandler = require("../middlewares/errorMiddleware");
const User = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

console.log("klajdfalsdflkasdklfajklsfklasdfjkl");
// JWT TOKEN
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

//REGISTER
const registerController = async (req, res, next) => {
  console.log("falksflksdlklafsdlfasldflasdkllk");
  try {
    console.log("body: ", req.body);
    const { username, email, password } = req.body;
    //exisitng user
    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      return next(new errorResponse("Email is already register", 500));
    }
    const user = await User.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log("sgjldflkslf");
    console.log(error);
    next(error);
  }
};

//LOGIN
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    //res
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//LOGOUT
const logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  sendToken,
};