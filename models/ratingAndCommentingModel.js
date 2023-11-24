const mongoose = require("mongoose");
const Book = require("./book");

const ratingCommentingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: [true, "Rating must belong to a book"],
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  averageStars: {
    type: Number,
    default: 3.5,
    // min: [1, "Rating must be above 1.0"],
    // max: [5, "Rating must be below 5.0"],
    // set: (val) => Math.round(val * 10) / 10,
  },
  ratingQuantity: {
    type: Number,
    default: 1,
  },
});

const RatingAndCommenting = mongoose.model("Rating", ratingCommentingSchema);

module.exports = RatingAndCommenting;
