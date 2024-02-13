const express = require("express");
const { isStudent } = require("../middlewares/auth");
const {
  createRating,
  getAvgRating,
  getAllRatingAndReviews,
} = require("../controllers/RatingAndreviews");
const router = express.Router();

router.post("/createrating", auth, isStudent, createRating);
router.get("/getavgrating", getAvgRating);
router.get("/allratiingreviwes", getAllRatingAndReviews);

module.exports = router;
