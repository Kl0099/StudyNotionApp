const express = require("express");
const { auth, isStudent } = require("../middlewares/auth");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateProfilePic,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");
const router = express.Router();

router.put("/updateprofile", auth, updateProfile);
router.post(
  "/updateprofilepic",
  auth,
  // upload.single("avatar"),
  updateProfilePic
);
router.delete("/deleteaccount", auth, deleteAccount);
router.get("/getallusersdetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, instructorDashboard);
module.exports = router;
