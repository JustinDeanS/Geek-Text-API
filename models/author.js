const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  // authorID: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  biography: String,
  publisher: String,
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
