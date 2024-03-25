const mongoose = require("mongoose");
const instance = require("../config/razorepay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const paymentSuccessEmail = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
// const mailSender = require("../utils/mailSender");
// const courseProgress = require("../models/CourseProgress");
const CourseProgress = require("../models/CourseProgress");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  //validation for if course is zero
  if (courses.length === 0) {
    return res.status(404).json({
      success: false,
      message: "please provide course id",
    });
  }

  // find total amount
  let totalAmount = 0;
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "course not found course ",
        });
      }
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student already enrolled in a course",
        });
      }
      totalAmount += course.price;
    } catch (error) {
      console.log("error payment capture :", error.message);
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log("error while create instace : ", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//verify payment  signature verification
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(401).json({
      success: false,
      message: "some fields are missing !!!",
    });
  }
  // now compare signature
  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // enrolled the students
    await enrolledStudents(courses, userId, res);

    return res.status(200).json({
      success: true,
      message: "payment was successfully verified",
    });
  }
  return res.status(401).json({
    success: false,
    message: " payment failed",
  });
};
const enrolledStudents = async (courses, userId, res) => {
  if ((!courses, !userId)) {
    return res.status(400).json({
      success: false,
      message: "data is incomplete",
    });
  }

  for (const courseId of courses) {
    try {
      const enrolledcourses = await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        {
          new: true,
        }
      );
      if (!enrolledcourses) {
        return res.status(400).json({
          success: false,
          message: "courses not found !!!",
        });
      }
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      // find the students and add courses
      const enrolledStudents = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );
      let StudnetName =
        enrolledStudents.firstName + " " + enrolledStudents.lastName;
      const emailResponse = mailSender(
        enrolledStudents.email,
        `Successfully Enrolled into ${enrolledcourses.courseName}`,
        courseEnrollmentEmail(enrolledcourses.courseName, StudnetName)
      );
      console.log("email sent successfully : ", emailResponse);
    } catch (error) {
      console.log(
        "error in enrolled studnet func in verifypayment : ",
        error.message
      );
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};

// direct enrolled students without payment
exports.directEnrolled = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  if ((!courses, !userId)) {
    return res.status(400).json({
      success: false,
      message: "data is incomplete",
    });
  }

  for (const courseId of courses) {
    try {
      const enrolledcourses = await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        {
          new: true,
        }
      );
      if (!enrolledcourses) {
        return res.status(400).json({
          success: false,
          message: "courses not found !!!",
        });
      }
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      // find the students and add courses
      const enrolledStudents = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );
      let StudnetName =
        enrolledStudents.firstName + " " + enrolledStudents.lastName;
      const emailResponse = mailSender(
        enrolledStudents.email,
        `Successfully Enrolled into ${enrolledcourses.courseName}`,
        courseEnrollmentEmail(enrolledcourses.courseName, StudnetName)
      );
      // console.log("email sent successfully : ", emailResponse);
      return res.status(200).json({
        success: true,
        message: "Successfully added students to course",
      });
    } catch (error) {
      console.log(
        "error in enrolled studnet func in verifypayment : ",
        error.message
      );
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
};
