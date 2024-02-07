const User = require("../models/User");
const Profile = require("../models/Profile");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const id = req.user.id;
    if (!contactNumber || !gender || !id) {
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

exports.updateProfile = async (req, res) => {
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

    await Profile.findByIdAndDelete({ _id: user.additionalDetails });

    //delete user from all enrolled courses

    //delete user
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
    console.log(userDetails);
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
