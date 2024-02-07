const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerater = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//sendotp
exports.sendotp = async (req, res) => {
  try {
    //fetch email
    const { email } = req.body;
    const user = await User.findOne({ email });

    //if user exists
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    //generate otp
    var otp = otpgenerater.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp generated : ", otp);
    //check unique otp
    let uniqOtp = await OTP.findOne({ otp: otp });

    while (uniqOtp) {
      otp = otpgenerater.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      uniqOtp = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("Otp Body : ", otpBody);
    //success message
    res.status(200).json({
      success: true,
      message: "otp sent successfully",
      otp,
    });
  } catch (error) {
    console.log("send Otp error : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signup
exports.signUp = async (req, res) => {
  //data fetching
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !contactNumber ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "all fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password must be equal",
      });
    }

    //check if user user already exists

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    //find latest otp
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    } else if (otp != recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    }

    //hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      password: hashPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("signup error : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //getdata
    const { email, password } = req.body;
    //validation

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "all fields required",
      });
    }

    //usercheck
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    //jwt token after match password

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "login successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //create cookie and send
  } catch (error) {
    console.log("login error : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//change password
