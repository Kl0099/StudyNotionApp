const express = require("express");
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  directEnrolled,
} = require("../controllers/Payments");
const router = express.Router();
const { auth, isStudent } = require("../middlewares/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);
router.post("/directEnrolled", auth, isStudent, directEnrolled);

module.exports = router;
