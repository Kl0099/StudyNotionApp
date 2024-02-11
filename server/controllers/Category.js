const Category = require("../models/Category");

//create Category
exports.createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;
    validation;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //create entry in databse
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log("createCategory error: " + error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getall tags
exports.showAllCategory = async (req, res) => {
  try {
    const AllCategorys = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      message: "here AllCategory",
      data: AllCategorys,
    });
  } catch (error) {
    console.log("fetching all Categories error: " + error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.catagoryPageDetails = async (req, res) => {
  try {
    const { catagoryId } = req.body;
    const selectedCategory = await Category.findById(catagoryId)
      .populate("course")
      .exec();
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "selected category not found",
      });
    }
    const diffCatagory = await Category.findById({
      _id: { $ne: catagoryId },
    })
      .populate("course")
      .exec();
    const allCatagory = await Category.find().populate({
      path: "course",
      match: { status: "published" },
    });

    const allcourse = allCatagory.flatMap((item) => item.course);
    const mostselled = allcourse.sort((a, b) => a.sold - b.sold).slice(0.1);
    res.status(200).json({
      success: true,
      message: "here all catagorys",
      selectedCategory,
      mostselled,
      diffCatagory,
    });
  } catch (error) {
    console.log("error occurd when finding selected catagory : ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
