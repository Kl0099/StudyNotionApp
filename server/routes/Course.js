const express = require("express");
const { auth, isInstructor } = require("../middlewares/auth");
const {
  getAllCourse,
  getCourseDetails,
  createCourse,
  editCourse,
} = require("../controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");
const router = express.Router();

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getallcourse", getAllCourse);
router.get("/getcoursedetails", getCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourse);

// ********************************************************************************************************
//                                      section routes
// ********************************************************************************************************
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);

// ********************************************************************************************************
//                                      subsection routes
// ********************************************************************************************************
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Update a Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete a Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
module.exports = router;
