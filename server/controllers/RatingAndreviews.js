const User = require("../models/User");
const RatingAndReviews = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const { courseId, rating, reviews } = req.body;
    // console.log("courseId: " + courseId);
    // console.log("rating" + rating);
    // console.log("review: " + reviews);
    const userId = req.user.id;
    // console.log("userId: " + userId);/
    const coursedetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!coursedetails) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }

    // const alreadyreview = await RatingAndReviews.findOne({ user: userId });
    // if (alreadyreview) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Course already reviewed by user",
    //   });
    // }

    const ratingandreview = await RatingAndReviews.create({
      user: userId,
      rating: rating,
      reviews: reviews,
      course: courseId,
    });
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: ratingandreview._id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingandreview,
    });
  } catch (error) {
    console.log("error when create a new rating : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAvgRating = async (req, res) => {
  try {
    const { courseId } = req.body;
    const result = await RatingAndReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          avarageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        avarageRating: result[0].avarageRating,
      });
    } else {
      return res.status(200).json({
        success: true,
        avarageRating: 0,
      });
    }
  } catch (error) {
    console.log("error when avgRating : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const ratingreview = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: ratingreview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    });
  }
};
