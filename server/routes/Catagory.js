const express = require("express");
const { auth, isInstructor, isAdmin } = require("../middlewares/auth");
const {
  createCategory,
  showAllCategory,
  catagoryPageDetails,
} = require("../controllers/Category");
const router = express.Router();

router.post("/createcatagory", auth, isAdmin, createCategory);
router.get("/allcatagory", showAllCategory);
router.post("/catagorypagedetails", catagoryPageDetails);

module.exports = router;
