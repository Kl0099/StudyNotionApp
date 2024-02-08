const mongoose = require("mongoose");
const instance = require("../config/razorepay");
const Course = require("../models/Course");
const User = require("../models/User");

exports.capturePayment = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;
  const uid = new mongoose.Types.ObjectId(userId);
  if (!courseId) {
    return res.status(404).json({
      success: false,
      message: "please enter valid courseId",
    });
  }
  let course;
  try {
    course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course does not exist",
      });
    }
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(404).json({
        success: false,
        message: "student is already enrolled",
      });
    }
  } catch (error) {
    console.log("error when capturePayments : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  const amount = course.price;
  const currency = "INR";
  const options = {
    amount,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course.id,
      userId,
    },
  };

  try {
    const paymentRes = await instance.orders.create(options);
    console.log(paymentRes);
    res.status(200).json({
      success: true,
      coursename: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentRes.id,
      currency: paymentRes.currency,
      amount: paymentRes.amount,
      message: "successfully created payment request",
    });
  } catch (error) {
    console.log("error when createPaymentRes : ", error);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
