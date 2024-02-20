const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

//send email
async function sendVarificationEmail(email, otp) {
  try {
    const mailRes = await mailSender(
      email,
      "Verification  email from StudyNotion",
      otpTemplate(otp)
    );
    console.log("email sent successfully");
  } catch (error) {
    console.log("verification email error: " + error);
    // console.log(error)
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  await sendVarificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
