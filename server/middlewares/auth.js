const User = require("../models/User");
const OTP = require("../models/OTP");
// const otpgenerater = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");
    console.log("auth : ", token);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded : ", decode);
      req.user = decode;
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    console.log("auth middleware error :", error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this route for students only",
      });
    }
    next();
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    // console.log(req.user);
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this route for admin only",
      });
    }
    next();
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    console.log(req.user);
    const userDetails = await User.findOne({ email: req.user.email });
    console.log(userDetails.accountType);
    if (userDetails.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "this route for Instructor only",
      });
    }
    next();
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
