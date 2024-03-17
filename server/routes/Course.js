const express = require("express");
const { auth, isInstructor } = require("../middlewares/auth");
const {
  getAllCourse,
  getCourseDetails,
  createCourse,
} = require("../controllers/Course");
const router = express.Router();

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getallcourse", getAllCourse);
router.get("/getcoursedetails", getCourseDetails);

module.exports = router;
