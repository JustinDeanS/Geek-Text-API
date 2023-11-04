const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  stars: {
    type: Number,
    min: 1,
    max: 5,
  },
  comments: {
    type: String,
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: [true, "Rating must belong to a book"],
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
