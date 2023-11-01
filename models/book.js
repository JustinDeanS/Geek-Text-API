const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String, // Store authorID as a string
    required: true, // Ensure that client provides a valid authorID
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  genre: String,
  publisher: String,
  yearPublished: Number,
  copiesSold: Number,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
