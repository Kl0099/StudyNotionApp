const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

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
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
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
    const { sectionName, sectionId, courseId } = req.body;
    if (!sectionName || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true }
    );

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(201).json({
      success: true,
      message: section,
      data: course,
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
    const { sectionId, courseId } = req.body;

    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await SubSection.deleteMany({ _id: { $in: section.subSection } });
    await Section.findByIdAndDelete(sectionId);
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(201).json({
      success: true,
      message: "Section deleted succesfully",
      data: course,
    });
  } catch (error) {
    console.log("deleteSection error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
