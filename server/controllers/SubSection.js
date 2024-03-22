const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files.video;
    if (!sectionId || !title || !description || !video) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");
    res.status(200).json({
      success: true,
      message: "subSection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("createsubSection error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, subSectionId, description } = req.body;
    if (!sectionId || !title || !description || !subSectionId) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const subsection = await SubSection.findById(subSectionId);
    if (!subsection) {
      return res.status(400).json({
        success: false,
        message: "subsection not found",
      });
    }

    if (title !== undefined) {
      subsection.title = title;
    }
    if (description != undefined) {
      subsection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subsection.videoUrl = uploadDetails.secure_url;
      subsection.timeDuration = `${uploadDetails.duration}`;
    }
    await subsection.save();
    const updetedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    res.status(200).json({
      success: true,
      message: "subSection created successfully",
      data: updetedSection,
    });
  } catch (error) {
    console.log("updatesubSection error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
};
