const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //fetch
    const { sectionName, courseId } = req.body;
    //validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fiels are required",
      });
    }

    //create section
    const newSection = await Section.create({ sectionName });
    //put section id in Course Schema
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    console.log("createSection error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;
    if (!sectionName || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Section updated succesfully",
    });
  } catch (error) {
    console.log("updateSection error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const deleteSection = await Section.findByIdAndDelete(sectionId);

    res.status(201).json({
      success: true,
      message: "Section deleted succesfully",
    });
  } catch (error) {
    console.log("deleteSection error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
