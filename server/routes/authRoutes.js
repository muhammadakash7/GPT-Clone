const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/authController");

// router object
const router = express.Router();
// routes
// Register
router.post("/register", registerController);
// LogIn
router.post("/login", loginController);
// LogOut
router.post("/logout", logoutController);
module.exports = router;
