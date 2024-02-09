const mongoose = require("mongoose");
const instance = require("../config/razorepay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

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
    //why?  because in the future we need this notes after varification payments
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

exports.varifySignature = async (req, res) => {
  const webHookSecrete = "12334234";

  const signature = req.headers["X-razorepay-signature"];
  const shasum = crypto.createHmac("sha256", webHookSecrete);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  if (signature === digest) {
    console.log("payment is authorized");
    //take courseid and userid from razorepay notes
    //req.body.payload.entity.notes
    //after payment userschema ==> courses add courseid and
    //courseschema => enrolledstudent => add userid
    const { courseId, userId } = req.body.payload.entity.notes;
    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "razorepay server erorr",
      });
    }

    try {
      const enrolledcourse = await Course.findByIdAndUpdate(
        { courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledcourse) {
        return res.status(404).json({
          success: false,
          message: "course not found error in payment",
        });
      }
      console.log(enrolledcourse);

      const enrolledStudent = await User.findByIdAndUpdate(
        { userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      const emailRes = await mailSender(
        enrolledStudent.email,
        "congracts form code help",
        "congrats "
      );
      res.status(200).json({
        success: true,
        message: "Signature verification completed successfully",
      });
    } catch (error) {
      console.log("error occuresd while verifying signature", error);
      res.status(500).json({
        success: false,
        message: "Signature verification failed",
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      message: "invalid signature",
    });
  }
};
