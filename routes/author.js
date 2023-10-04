const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book.js");

//creates an author
router.post("/createAuthor", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new author" });
  }
});

//retrieves books associated with an author
router.get("/:AuthorId/books", async (req, res) => {
  const AuthorId = req.params.AuthorId;
  console.log("Author:", AuthorId);

  try {
    const books = await Book.find({ author: AuthorId }).select("title");
    const bookTitles = books.map((book) => book.title);
    res.json(bookTitles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve book titles by author" });
  }
});

module.exports = router;
