const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");

//resetPassword token
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, //5 minutes
      },
      { new: true }
    );

    //create url

    const url = `https://localhost:3000/update-password/${token}`;
    await mailSender(
      email,
      "password reset link",
      `password reset link : ${url}`
    );

    return res.json({
      success: true,
      message: "email sent successfully please change password",
    });
  } catch (error) {
    console.log("resetpaassword ganarate error: " + error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body;
    // console.log(token);
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "password is not matching",
      });
    }
    // let objecttoken = new mongoose.Types.ObjectId(token);
    // console.log(objecttoken);

    const userDetails = await User.findOne({ token: token });
    console.log(userDetails);
    if (!userDetails) {
      return res.status(403).json({
        success: false,
        message: "token is invalid",
      });
    }
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: "token is expired , please try again",
      });
    }
    //hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashPassword,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log("resetpaassword error: " + error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
