const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//createcourse
exports.createCourse = async (req, res) => {
  try {
    //feetch data
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;
    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !tag ||
      !whatYouWillLearn ||
      !price ||
      !category
    ) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }

    //user is instuctore or not
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }
    //check valid tag
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "category Details not found",
      });
    }

    //upload image in cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create course
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      whatYouWillLearn: whatYouWillLearn,
      instructor: instructorDetails._id,
      price: price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //add new course to the userSchema
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );
    //update tag Schema
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error("create course Error : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//getallcourses
exports.showAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    res.status(200).json({
      success: true,
      message: "data for all courses fetch successfully",
      data: allCourses,
    });
  } catch (error) {
    console.error("fetch all courses Error : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all course",
      error: error.message,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("ratingAndReviews")
      .populate("Catagory")
      .populate("studentsEnrolled")
      .exec();

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
  } catch (error) {
    console.error("get all courses Error : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all course",
      error: error.message,
    });
  }
};
