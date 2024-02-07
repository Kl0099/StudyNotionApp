const mongoose = require("mongoose")

const ratingAndReviews = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    required: true,
    type: String,
  },
})

module.exports = mongoose.model("RatingAndReview", ratingAndReviews)
