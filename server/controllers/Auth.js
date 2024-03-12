const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerater = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");

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
      accoutType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
    } = req.body;
    console.log(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accoutType,
      otp
    );
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accoutType ||
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
    const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountType: accoutType,
      additionalDetails: profileDetails._id,
      image: {
        public_id: null,
        url: userImage,
      },
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
        expiresIn: "7d",
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
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
