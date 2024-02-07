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
