const User = require("../models/User");
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const id = req.user.id;
    console.log(id);
    if (!gender || !id) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findById(id);
    const profileId = user.additionalDetails;
    const profieDetails = await Profile.findById(profileId);
    profieDetails.about = about;
    profieDetails.gender = gender;
    profieDetails.dateOfBirth = dateOfBirth;
    profieDetails.contactNumber = contactNumber;
    await profieDetails.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profieDetails,
    });
  } catch (error) {
    console.log("Error while updating profile : ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "INVALID ID",
      });
    }
    //delete additional details

    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    });

    //delete user from all enrolled courses
    //delete user
    for (const courseId of user.courses) {
      await Course.findByIdAndDelete(
        courseId,
        {
          $pull: { studentEnroled: id },
        },
        {
          new: true,
        }
      );
    }
    await User.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting profile : ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    // console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfilePic = async (req, res) => {
  try {
    // const displayPicture = req.files.displayPicture;
    const { avatar } = req.body;
    const userId = req.user.id;
    // console.log(avatar);
    // const image = await uploadImageToCloudinary(
    //   avatar,
    //   process.env.FOLDER_NAME,
    //   1000,
    //   1000
    // );
    const cloud = await cloudinary.v2.uploader.upload(
      avatar,
      {
        folder: process.env.FOLDER_NAME,
      },
      (err, result) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: err.message,
          });
      }
    );
    // console.log(image);
    // console.log("cloud image", cloud);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: cloud.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
