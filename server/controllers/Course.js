const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const cloudinary = require("cloudinary");
//createcourse
exports.createCourse = async (req, res) => {
  try {
    //feetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tag: _tag,
      // thumbnailImage,
      instructions: _instructions,
      status,
    } = req.body;
    console.log(
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category
      // thumbnailImage
    );
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    const thumbnail = req.files.thumbnailImage;
    console.log("thumbnail : ", thumbnail);

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
    if (!status || status === undefined) {
      status = "Draft";
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

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    // console.log("cloudinary image :", thumbnailImage);
    //upload image in cloudinary

    // const cloud = await cloudinary.v2.uploader.upload(
    //   thumbnailImage,
    //   {
    //     folder: process.env.FOLDER_NAME,
    //   },
    //   (err, result) => {
    //     if (err)
    //       return res.status(500).json({
    //         success: false,
    //         message: err.message,
    //       });
    //   }
    // );

    //create course
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      whatYouWillLearn: whatYouWillLearn,
      instructor: instructorDetails._id,
      price: price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
      tag,
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
    console.error("create course Error : ", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//getallcourses
exports.getAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
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

exports.getCourseDetails = async (req, res) => {
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

// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      // .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};
