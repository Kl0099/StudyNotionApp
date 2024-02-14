const express = require("express");
const { auth, isInstructor } = require("../middlewares/auth");
const {
  getAllCourse,
  getCourseDetails,
  createCourse,
} = require("../controllers/Course");
const router = express.Router();

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/allcourse", getAllCourse);
router.get("/allcoursedetails", getCourseDetails);

module.exports = router;
