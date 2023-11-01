const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  // authorID: {
  //   type: String, // You can specify the type you prefer
  //   required: true,
  //   unique: true, // Manually ensure uniqueness on the client side
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
