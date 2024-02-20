const express = require("express");
const {
  login,
  signUp,
  sendotp,
  changePassword,
} = require("../controllers/Auth");
const { sign } = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendotp);

//changepassword
router.post("/changepassword", auth, changePassword);

//resetpassword
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
